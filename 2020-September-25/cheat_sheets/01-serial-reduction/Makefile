all : 01-serial-reduction.html

01-serial-reduction.html : index.php shader.php app.js init.frag march.frag click.frag reduce.frag
	php index.php > $@

clean:
	rm -rf *.html *~
