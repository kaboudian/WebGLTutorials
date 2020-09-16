all : beeler_reuter.html

beeler_reuter.html : index.php app.js init.frag comp.frag click.frag
	php index.php > $@

clean:
	rm -rf *.html *~
