all : 02-parallel-reduction.html

02-parallel-reduction.html : index.php shader.php app.js init.frag march.frag click.frag reduceS1.frag reduceS2.frag
	php index.php > $@

clean:
	rm -rf *.html *~
