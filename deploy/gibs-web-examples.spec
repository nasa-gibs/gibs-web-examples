Name:		gibs-web-examples
Version:	4.0.0
Release:	2%{?dist}
Summary:	Examples of using GIBS with various web mapping libraries

License:	ASL 2.0
URL:		https://earthdata.nasa.gov/gibs
Source0:	gibs-web-examples.tar.gz
Source1:	gibs-web-examples.httpd.conf

BuildArch:	noarch

%description
Examples of using GIBS with various web mapping libraries


%prep
%setup -q -n %{name}
cp %{SOURCE1} .


%build


%install
rm -rf %{buildroot}
install -m 755 -d %{buildroot}/%{_datadir}/%{name}
cp -r {examples,demos,lib} %{buildroot}/%{_datadir}/%{name}

install -m 755 -d %{buildroot}/%{_sysconfdir}/httpd/conf.d
install -m 644 gibs-web-examples.httpd.conf \
	%{buildroot}/%{_sysconfdir}/httpd/conf.d/gibs-web-examples.conf


%clean
rm -rf %{buildroot}


%files
%defattr(-,root,root,-)
%doc README.md LICENSE
%{_datadir}/%{name}
%config %{_sysconfdir}/httpd/conf.d/gibs-web-examples.conf


%post
if [ $1 -gt 0 ] ; then
   if /sbin/service httpd status >/dev/null ; then
      /sbin/service httpd reload
   fi
fi

%postun
if [ $1 -eq 0 ] ; then
   if /sbin/service httpd status >/dev/null ; then
       /sbin/service httpd reload
   fi
fi


%changelog
* Wed Apr 8 2015 Mike McGann <mike.mcgann@nasa.gov> - 4.0.0-1
- Added Cesium demo

* Fri Sep 26 2014 Mike McGann <mike.mcgann@nasa.gov> - 2.0.0-1
- Upgraded OpenLayers 3 to release version
- Upgraded Leaflet to 0.7.3

* Tue Apr 29 2014 Mike McGann <mike.mcgann@nasa.gov> - 1.3.0-1
- Added rolling time slider examples

* Wed Apr 9 2014 Mike McGann <mike.mcgann@nasa.gov> - 1.2.0-1
- Added examples with Bing and Google Maps

* Fri Apr 4 2014 Mike McGann <mike.mcgann@nasa.gov> - 1.1.0-1
- Upgraded Leaflet
- Fixed projection definition in the Arctic
- OpenLayers 2 now uses proj4js version 1
- Added OpenLayers 3
- Leaflet monkey patch for OOB tiles

* Wed Dec 4 2013 Mike McGann <mike.mcgann@nasa.gov> - 1.0.0-1
- Initial package
