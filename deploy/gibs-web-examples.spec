Name:		gibs-web-examples
Version:	1.0.0
Release:	1%{?dist}
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
cp -r {openlayers*,leaflet} %{buildroot}/%{_datadir}/%{name}

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


%changelog
* Wed Dec 4 2013 Mike McGann <mike.mcgann@nasa.gov> - 1.0.0-1
- Initial package
