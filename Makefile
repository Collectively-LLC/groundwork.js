#
# Common build tasks for Groundwork.js:
#
# make release - Create new library release. Pushes tag to Github and triggers make deploy.
# make deploy  - Create production build and sync with S3 bucket
# make dist    - Build library and docs
#
# Internal keys:
#
# AWS Dev: AKIAIAV3IKJIQJVVXBBQ
# -secure: CCWA0mbPdWHq9HumT1EM78ZsSW89dJTWjkIjJQbgT/LPwJWjHD554MjgUgHQbL6fLhpSyw4oAlX75HP15UpcFum9qO9xdXQ56mAb6nz8Qvi3Aw/8hgzsJzWeRSmxXpNU5QT+aWD5/yJLrzSk8rogz3+GKAQSgk1ebrs7Qe8udz5b2lh4Tfhr9dSHPrrPZ6IOJZGtEVWmAo+wWYJetUHuJAhdA1m5ejdbTZ+Tk/c0OkEO9VpunriOs+B4zZCs6g2iSUl3/N94mOMvFYCemVbYB+UJ46HcVecXylc0BkmZjL31i+apQ5mQFSa1BR1zCoemk79tyAgxGp07Um2dZ2T6djEkUB19g752v8aoENM7TLriNXLy2yxgK9RUReaxhg0q3u4mdPsIBPfSoBmCWzpEn/CZxwKGbo7A/L10BwaeRvqThl/ts9Gd3NiYy78gKZ+3PLwHTJ+RDFXdoP9/IFZheqh52lTdbarCil9SV+TJGIkBN5FcP5yXjDegBpsr+/fv/y45c/P4/TOh1W7JH7L4db5gRbYazPJ9+IwiLVNWOnq8iPUn4CK4XzRHmMZ79B+mtTD0yEXjHcwezEW9lA/sWKiLdXRoG9YyYgLbmHtRcbPqBc/Fao9NSzhaFTegFLeTHAOusTS0n7rPfZS97ji4NBwyHqJIw3xyXKpNzYae9yI=
#
# AWS Prod: AKIAJ2FJKT7KSNFRPWCQ
# -secure: AFB8OtuKeqmbkCAwHmthc78yQd+o62twi4sTiNAi7OhRiQMYYxYQeNee3tJSVXOvnQ/nGyat7X5oQFVx0mWm560eQwE/8XyZPKI1tfT9Wd0zOYYprV7m8rMg1sxaEI3zwbF+f2JDcZxY6xvV2isXmGlYF6fJNyIig3GPBTEON571Al2OXqhwXH+Ey068KAYReUf2q4WLXGea+bcFWo2+Al8PM9AqmYmqfKoIuI8muVvpcSAfJd0+nZZZr9YQvdQ+iXy1wkvlv5S3T2TTRSovAO20wyMf5ATruL0aCzPd2JZor+UKKP8sciI48cGJACqY9HBJAjxGiXgSKWeZ5oTxDXIyz/okH9RY/Bjf5Z0G4qjhFvPUdqoWcaFsnyt/E+YCTS0qc5TwgFoicR6Ug+iF94QGW2PGmd4mMV8q2G9tGJ6NiArGkdIJbjgKT1uJVou9aVCKnuvWq8rFLaj4jOVkPNX24OUo9MSzrr4JWekBA6UzNba5cfW9CMQ+MvLmOt2LPDZYiDeVxeW2Kphi4xly8X+0hzf0Z6YvKN6qe8tJHCO0E5j9VRSWGRMAOKoZiP4X5IsFzxvIoc8Hu8slMmz2u6PZNjDTa1/v2jpE8UMSh7YewqOWf0Vv2jQsvzD+7e5MoE1adslFxGTzmoYLSLyynC7rwd9+bMuolNVJ66FQf9w=
#
# CloundFront Dev: E3VVDH4SEA2OKI
# CloundFront Prod: E1YK0CEUDW7K3G

.PHONY: build clean deploy dist docs production publish-s3 release start test test-watch

BIN=node_modules/.bin
VERSION=$(shell node -p "require('./package.json').version")

S3_BUCKET=cdn.thegroundwork.com
S3_REGION=us-west-2
CLOUDFRONT_DISTRIBUTION=E1YK0CEUDW7K3G

BLUE=\n\033[0;34m

build:
	@echo "$(BLUE) @@@ (build) Building library..."
	NODE_ENV=development $(BIN)/webpack

clean:
	@echo "$(BLUE) @@@ (clean) Cleaning dist..."
	rm -rf dist

complete:
	@echo "\033[0m" # Reset terminal colors

deploy:
	@echo "$(BLUE) @@@ (deploy) Beginning deploy..."
	@make dist
	@make publish-s3
	@echo "$(BLUE) @@@ (deploy) Deploy complete."
	@make complete

dist:
	@echo "$(BLUE) @@@ (dist) Building dist version..."
	@make lint
	@make clean
	@make build
	@make production
	@make docs
	@make move-to-latest
	@make size

docs:
	@echo "$(BLUE) @@@ (docs) Building docs..."
	$(BIN)/esdoc -c esdoc.json

lint:
	@echo "$(BLUE) @@@ (lint) Linting code..."
	$(BIN)/eslint src/*.js

move-to-latest:
	@echo "$(BLUE) @@@ (move-to-latest) Moving to latest folder..."
	@rsync -rv --remove-source-files dist/ dist/latest/
	@mv dist/latest/index.html dist
	@rm -rf dist/examples
	@rm -rf dist/docs

production:
	@echo "$(BLUE) @@@ (production) Building production version..."
	NODE_ENV=production $(BIN)/webpack -p

publish-s3:
	@echo "$(BLUE) @@@ (publish-s3) Syncing to S3 ($(BUCKET))..."
	aws s3 sync dist s3://$(S3_BUCKET)/groundworkjs --region=$(S3_REGION)
	aws s3 cp --recursive dist/latest s3://$(S3_BUCKET)/groundworkjs/$(VERSION) --region=$(S3_REGION)
	aws configure set preview.cloudfront true
	aws cloudfront create-invalidation --distribution-id $(CLOUDFRONT_DISTRIBUTION) --paths /groundworkjs/index.html /groundworkjs/latest/*

release:
	@echo "$(BLUE) @@@ (release) Beginning release..."
	@read -p "Bump version (major|minor|patch|<$(VERSION)>): " version; \
	$(BIN)/bump -p $$version | xargs -I {} sh replace.sh {}; \
	sh release.sh

size:
	@echo "$(BLUE) @@@ groundwork.min.js gzip size $(shell $(BIN)/gzip-size dist/latest/groundwork.min.js | $(BIN)/pretty-bytes) \033[m"

start:
	@echo "$(BLUE) @@@ (start) Starting development server..."
	@make clean
	@make build
	@make docs
	@make move-to-latest
	node server.dev.js

test:
	@echo "$(BLUE) @@@ (test) Executing tests..."
	NODE_ENV=test $(BIN)/karma start

test-ci:
	@echo "$(BLUE) @@@ (test-ci) Executing tests..."
	NODE_ENV=test $(BIN)/karma start --browsers Firefox

test-watch:
	@echo "$(BLUE) @@@ (test-watch) Starting test watcher..."
	NODE_ENV=test $(BIN)/karma start --watch
