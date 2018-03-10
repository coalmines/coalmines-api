APP_NAME := coalmines-api

# directories
PREFIX := /opt/node-apps/usr
DESTDIR := $(PREFIX)/share/$(APP_NAME)
SRC_DIR := src
BUILD_DIR := build
BUNDLE_DIR := $(BUILD_DIR)/bundle

# commands
BABEL := /usr/bin/babel
NPM := /usr/bin/npm
NPM_INSTALL := $(NPM) install
TAR := /bin/tar

all: prepare
	@echo "Creating application bundle..."
	@mkdir -p $(BUNDLE_DIR)
	$(BABEL) --copy-files --ignore spec.js --out-dir $(BUNDLE_DIR)/src $(SRC_DIR)
	@cp package.json $(BUNDLE_DIR)/
	@cp main.js $(BUNDLE_DIR)/
	@cd $(BUNDLE_DIR) && $(NPM_INSTALL) --production

dist:
	@echo "Creating tarball in ${BUILD_DIR}..."
	@$(TAR) -czf $(BUILD_DIR)/bundle.tar.gz -C $(BUNDLE_DIR) .

install:
	mkdir -p $(DESTDIR)
	rsync -a $(BUNDLE_DIR)/ $(DESTDIR)/

reinstall:
	mkdir -p $(DESTDIR)
	@-rm -Rf $(DESTDIR)/*
	rsync -a $(BUNDLE_DIR)/ $(DESTDIR)/

clean:
	@echo "Purging build directory..."
	@-rm -Rf $(BUILD_DIR)

distclean: clean
	@echo "Purging local dependencies..."
	@-rm -Rf node_modules

prepare:
	@echo "Installing dependencies..."
	@$(NPM_INSTALL)
