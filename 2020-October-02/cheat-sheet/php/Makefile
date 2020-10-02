all : fhn.html

fhn.html : index.php shader.php app.js init.frag march.frag
	php index.php > $@

clean:
	rm -rf *.html *~
