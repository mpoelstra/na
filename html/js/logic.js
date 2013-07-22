window.NA = window.NA || {};

NA.controller = (function(){
    var pubprops = {
        pages: null,
        currentPage: null,
        previousPage: null,
        initialize : function(callback) {
            var self = this;

            window.onhashchange = function() {
                // do something awesome here
                if(window.location.hash) {
                    self.goToPage(window.location.hash);
                }
            };

            self.initPages(function() {
                callback();
            });

        },
        initPages: function(callback) {
            var self = this;
            //set pages
            var pages = $('body').find('.page');
            self.setPages(pages);
            self.setPageClasses(pages);
            //hookup the pageVisible event to pages
            //pages.bind('pageVisible', pageVisible);
            callback();
        },
        setPages: function(pages) {
            this.pages = pages;
            sessionStorage.setItem('pages', pages);
        },
        getPages: function() {
            if (!this.pages) {
                this.pages = sessionStorage.getItem('pages');
            }

            return this.pages || 0;
        },
        setPageClasses: function(pages) {
            l('setPageClasses');
            $.each(pages, function(key, page){
                var footer = $(page).find('footer').length;
                if (!footer) {
                    $(page).addClass('nofooter');
                }
                var header = $(page).find('header').length;
                if (!header) {
                    $(page).addClass('noheader');
                }
            });
        },
        goToPage: function(page) {
            var type = $.type(page);
            switch(type) {
                case 'number':
                    this.togglePage(page);
                    break;
                case 'string':
                    var pageObject = $(page);
                    var pageNumber = this.getPages().index(pageObject);
                    this.togglePage(pageNumber);
                    break;
            }
        },
        togglePage: function(page) {
            l('togglePage: ' + page);
            var pages = this.getPages();
            this.previousPage = pages.eq(this.getCurrentPage()).attr('id');
            this.setCurrentPage(page);
            var pages = this.getPages();
            if (pages.length) {
                pages.removeClass('visible');
                pages.eq(page).addClass('visible');
                //pages.eq(page).trigger('pageVisible');
            }
        },
        nextPage: function() {
            var nextPage = parseInt(this.getCurrentPage()) + 1;
            this.togglePage(nextPage);
        },
        prevPage: function() {
            var prevPage = parseInt(this.getCurrentPage()) - 1;
            this.togglePage(prevPage);
        },
        setCurrentPage: function(page) {
            this.currentPage = page;
            sessionStorage.setItem('currentPage', page);
        },
        getCurrentPage: function() {
            if (!this.currentPage) {
                this.currentPage = sessionStorage.getItem('currentPage');
            }

            return this.currentPage || 0;
        }
    }
    return pubprops;
})()