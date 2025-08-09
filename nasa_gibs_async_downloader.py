"""
Automated client for downloading and managing satellite images from NASA GIBS's WMS service

- Connects to NASA GIBS's Web Map Service (WMS) using owslib.
- Saves the list of layers and their metadata in Parquet files
- Downloads JPEG images of the selected layers

# dependencies: owslib, polars, aiofiles
"""

from pathlib import Path
from datetime import datetime
import asyncio
from owslib.wms import WebMapService
from owslib.util import ServiceException
from owslib.map.wms111 import ContentMetadata
import polars as pl
import aiofiles

# Define the current path where the images will be saved
current_path = Path(__file__).parent.resolve()

# URL base of WMS GIBS service
# 'best' = best quality available
# 'epsg4326' = geographical projection
WMS_URL: str = "https://gibs.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi?"

# available layers saved in parquet file
LAYERS_NAME: Path = Path(current_path, "layers.parquet")

# available layers saved in parquet file
LAYERS_METADATA: Path = Path(current_path, "layers_metadata.parquet")

# last layers metadata saved in parquet file
LAST_LAYERS_METADATA: Path = Path(current_path, "last_layers_metadata.parquet")

# Connect to WMS service
wms = WebMapService(WMS_URL, version="1.1.1")


def adjust_column_sizes(data: dict) -> pl.DataFrame:
    """
    Adjusts the columns of a dictionary so that they all have the same number of elements
    based on the column with the most elements, filling in with None if necessary.

    Args:
    - data (dict): Dictionary with columns as keys and values as lists or unique values.

    Returns:
    - pl.DataFrame: Data frame with adjusted columns.
    """
    # Find the maximum size of the columns (lists)
    max_length = max(
        len(value) if isinstance(value, list) else 1 for value in data.values()
    )

    # Adjust the columns
    for column, values in data.items():
        if isinstance(values, list):
            # If the list is shorter, fill in with None.
            if len(values) < max_length:
                values.extend([None] * (max_length - len(values)))
        else:
            # If it is not a list, convert to a list with the same repeated value.
            data[column] = [values] * max_length

    return pl.DataFrame(data)


def check_if_exists(layer) -> bool:
    """if layer exists"""
    if layer in wms.contents:
        layer_metadata = wms.contents["BlueMarbleNG"]
        print(f"Layer '{layer_metadata.title}' exists!")
    else:
        print(f"\nThe layer {layer} was not found.")


def get_available_layers(last_update: bool = True) -> list:
    """Get the available layers, otherwise created, save it and return it"""
    available_layers = None  # to avoid unbound variable warning
    # if the database (parquet file) exists and the last update is nor required then:
    if LAYERS_NAME.exists() and last_update is False:
        available_layers: list = pl.read_parquet(LAYERS_NAME)[
            "layers"
        ].to_list()  # read
    else:
        # create the list of available layers
        available_layers: list = [layer_name for layer_name in wms.contents]
        pl.DataFrame({"layers": available_layers}).write_parquet(LAYERS_NAME)  # save it
        print(f"file created: {LAYERS_NAME}")

    return available_layers


def get_metadata_layers(
    available_layers: list, last_update: bool = True
) -> pl.DataFrame:
    """Get metadata for a specific layer"""
    # if the database (parquet file) exists and the last update is nor required then:
    if LAYERS_METADATA.exists() and last_update is False:
        metadata: pl.DataFrame = pl.read_parquet(LAYERS_METADATA)
        return metadata
    # if the database doesn't exists then created or update if last update is True
    else:
        # The current date is defined as the last date on which data was updated.
        last_updated = datetime.now().strftime("%Y-%m-%d")
        # this 'counter' will be used as an index for subsequent data analysis
        counter = 0
        # the list where each of the metadata from the layers converted to dataframes will be stored
        dataframes = []
        try:
            for layer in available_layers:
                if layer in wms.contents:
                    layer_metadata: ContentMetadata = wms.contents[layer]
                    counter += 1
                    layer_info = {
                        "group": counter,
                        "name": layer,
                        "title": layer_metadata.title,
                        "abstract": layer_metadata.abstract,
                        "queryable": bool(layer_metadata.queryable),
                        "Projections (SRS) compatible": layer_metadata.crsOptions,
                        "Bounding Box (Lat/Lon)": layer_metadata.boundingBoxWGS84,
                        "timepositions": layer_metadata.timepositions,
                        "default_timeposition": layer_metadata.defaulttimeposition,
                        "elevations": layer_metadata.elevations,
                        "keywords": layer_metadata.keywords,
                        "styles": list(layer_metadata.styles.keys()),
                        "num_metadata_urls": len(layer_metadata.metadataUrls),
                        "metadata_urls": [
                            m["url"] for m in layer_metadata.metadataUrls
                        ],
                        "num_data_urls": len(layer_metadata.dataUrls),
                        "data_urls": [d["url"] for d in layer_metadata.dataUrls],
                        "last_updated": last_updated,
                    }

                    layer_info = adjust_column_sizes(layer_info)
                    layer_info = layer_info.with_columns(
                        [
                            pl.col("group").cast(pl.Int64),
                            pl.col("name").cast(pl.String),
                            pl.col("title").cast(pl.String),
                            pl.col("abstract").cast(pl.String),
                            pl.col("queryable").cast(pl.Boolean),
                            pl.col("Projections (SRS) compatible").cast(pl.List),
                            pl.col("Bounding Box (Lat/Lon)").cast(pl.List),
                            pl.col("timepositions").cast(pl.String),
                            pl.col("default_timeposition").cast(pl.String),
                            pl.col("elevations").cast(pl.String),
                            pl.col("keywords").cast(pl.List),
                            pl.col("styles").cast(pl.List),
                            pl.col("num_metadata_urls").cast(pl.Int64),
                            pl.col("metadata_urls").cast(pl.String),
                            pl.col("num_data_urls").cast(pl.Int64),
                            pl.col("data_urls").cast(pl.List),
                            pl.col("last_updated").cast(pl.String),
                        ]
                    )
                    dataframes.append(layer_info)
                else:
                    print(f"\nThe layer '{layer}' wasn't found. Check the list.")
        except pl.exceptions.InvalidOperationError as e:
            print(f"The names or its datatype has changed!: Error; {e}")
            return pl.DataFrame()
        # Concat all dataframes
        try:
            df: pl.DataFrame = pl.concat(dataframes)
        except pl.exceptions.SchemaError as e:
            print(f"polars.exceptions.SchemaError: {e}")
            return pl.DataFrame()
        print("\n--- Layer saving metadata completed' ---")
        df.write_parquet(Path(current_path, "layers_metadata.parquet"))

        return df


def get_last_metadata_layers(df: pl.DataFrame, last_update: bool = True):
    """
    The latest available update of the layers is obtained to
    avoid incomplete data extraction. df = metadata layers
    """
    # if the database (parquet file) exists and the last update is nor required then:
    if LAST_LAYERS_METADATA.exists() and last_update is False:
        df = pl.read_parquet(LAST_LAYERS_METADATA)

    # if the database doesn't exists then created or update if last update is True
    else:
        # Apply some filters to get relevant information of original metadata layers
        df = (
            # select only the necessary columns to extract details
            df.select(["group", "name", "timepositions"])
            # drop nulls (unnecessary rows that has not any relevant data)
            .drop_nulls()
            # group by both columns, group and name, to do some stuff...
            .group_by(["group", "name"], maintain_order=True)
            # the stuff is, get the last row (time) of each group (layer)
            .agg(pl.col("timepositions").last())
            # then, add a new column to extract the second date
            # To download the most recent complete image
            .with_columns(
                pl.col("timepositions").str.split("/").list.get(1).alias("date")
            )
        )

        # Save the last metadata layers in a parquet file
        df.write_parquet(LAST_LAYERS_METADATA)

    return df


async def save_images(layer_name: str, time: str):
    """Save images"""
    bounds = (-180, -70, 180, 70)
    size_image = (2000, 1000)
    try:
        img_data = wms.getmap(
            layers=[layer_name],
            srs="epsg:4326",
            bbox=bounds,
            size=size_image,
            time=time,
            format="image/jpeg",
            transparent=True,
        )

        # Save the picture in this file in asynchronous way with 'aiofiles'
        async with aiofiles.open(
            Path(current_path, f"{layer_name}_{time}.jpg"), "wb"
        ) as f:
            await f.write(img_data.read())

    except ServiceException as e:
        print(f"Service Exception: {e}")

    except Exception as e:
        print(f"Error {e.__class__.__name__}: {e}")


async def save_in_group(layers_name: list, layers_date: list):
    """Save concurrently"""
    # launch tasks to the event loop
    tasks = [
        asyncio.create_task(save_images(name, date))
        for name, date in zip(layers_name, layers_date)
    ]

    # Wait for all tasks to finish
    await asyncio.gather(*tasks)


def unit_test():
    """Quick test"""
    # If 'update' it is false, it does not call the API and uses the data stored
    # in Parquet, but if it is true, it calls the API and saves it in Parquet.
    update = False

    # 1) get available layers on the web
    available_layers = get_available_layers(last_update=update)

    # 2) get the meta data layers
    metadata_layers: pl.DataFrame = get_metadata_layers(
        available_layers=available_layers, last_update=update
    )

    # 3) get the last details of metadata layers based on time positions
    last_metadata_layers: pl.DataFrame = get_last_metadata_layers(
        metadata_layers, last_update=update
    )

    # 4) extract the names of the last date of each layer
    # Example: download the last 5 available images
    available_layers_name = last_metadata_layers["name"].to_list()[:5]
    available_layers_date = last_metadata_layers["date"].to_list()[:5]

    # 5) save images in a concurrent way
    asyncio.run(
        save_in_group(available_layers_name, available_layers_date)
    )  # run event loop


if __name__ == "__main__":
    # Run unit test when executing this script
    unit_test()
