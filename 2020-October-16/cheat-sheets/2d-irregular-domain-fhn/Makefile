all : 2d-irregular-domain-fhn.html

2d-irregular-domain-fhn.html : index.php shader.php app.js init.frag march.frag click.frag phase.frag
	php index.php > $@

clean:
	rm -rf *.html *~
