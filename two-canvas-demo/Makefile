all : fhn.html

fhn.html : index.php app.js init.frag march.frag uClick.frag vClick.frag
	php index.php > $@

clean:
	rm -rf *.html *~
