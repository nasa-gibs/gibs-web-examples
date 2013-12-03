ARTIFACT=dist/gibs-web-examples.tar.gz

all: $(ARTIFACT)

$(ARTIFACT):
	mkdir -p dist
	tar cvf $(ARTIFACT) \
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

distclean:
	rm -rf dist


