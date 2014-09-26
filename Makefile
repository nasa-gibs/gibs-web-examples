#  GIBS Web Examples
#
#  Copyright 2013 - 2014 United States Government as represented by the
#  Administrator of the National Aeronautics and Space Administration.
#  All Rights Reserved.
#
#  Licensed under the Apache License, Version 2.0 (the "License");
#  you may not use this file except in compliance with the License.
#  You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
#  Unless required by applicable law or agreed to in writing, software
#  distributed under the License is distributed on an "AS IS" BASIS,
#  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#  See the License for the specific language governing permissions and
#  limitations under the License.

ARTIFACT=dist/gibs-web-examples.tar.gz

all: rpm

$(ARTIFACT): clean
	mkdir -p dist
	tar cvf $(ARTIFACT) \
		--exclude=build \
		--exclude=dist \
		--transform='s,^,gibs-web-examples/,' \
		*

rpm: $(ARTIFACT)
	rm -rf build
	mkdir -p build/SOURCES
	cp $(ARTIFACT) build/SOURCES
	cp deploy/gibs-web-examples.httpd.conf build/SOURCES
	rpmbuild --define "_topdir $(PWD)/build" \
		-ba deploy/gibs-web-examples.spec
	cp build/RPMS/noarch/* dist

clean:
	rm -rf build

distclean: clean
	rm -rf dist
