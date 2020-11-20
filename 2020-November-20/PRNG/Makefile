all : index.html

index.html : index.php
	php index.php > $@
	cp 	-f $@ prng.html

.PHONY: index.html

clean:
	rm -rf *.html *~
