all : fhn-rk4-2.html

fhn-rk4-2.html : index.php shader.php app.js init.frag march.frag click.frag
	php index.php > $@

clean:
	rm -rf *.html *~
