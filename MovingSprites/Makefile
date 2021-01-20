all : index.html

index.html : index.php
	php index.php > $@
	cp -r $@ sprites.html

.PHONY: index.html

clean:
	rm -rf *.html *~
