function Pagination(paginationDiv, paginationObject) {
  var that = this;
  this.page = paginationObject.page;
  this.numPages = paginationObject.num_pages;
  this.perPage = paginationObject.per_page;
  this.numVisible = 10;
  this.$el = $(paginationDiv);
  this.$currentPage;
  this.$targetPage;
  this.currentNum;
  this.targetNum;
  this.targetIndex;
  this.lastIndex = this.numPages - 1;

  this.init = function() {
    this.buildPagination();
    this.initialSetup();
    if (this.numPages > this.numVisible) {
      this.initialClip();
    }
  };

  this.buildPagination = function() {
    var pageArray = _.range(1, this.numPages + 1);
    for (var i = 0; i < pageArray.length; i++) {
      pageArray[i] = $('<a>').html(pageArray[i]).addClass('page');
    }

    var nextPage = $('<a>').html('Next <i class="fa fa-angle-double-right"></i>').attr('data', 'next').addClass('next'),
        prevPage = $('<a>').html('<i class="fa fa-angle-double-left"></i>&nbsp;Previous').attr('data', 'prev').addClass('prev');
    pageArray.unshift(prevPage);
    pageArray.push(nextPage);
    this.$el.html(pageArray);
    // this.disableClick();
  };

  // this.disableClick = function(index) {
  //   _.each(that.$el.find('a'), function(link) {
  //     $(link).attr('disabled', 'disabled');
  //   });

  //   setTimeout(function() {
  //     _.each(that.$el.find('a'), function(link) {
  //       $(link).attr('disabled', '');
  //     });
  //   }, 800);
  // };

  this.initialSetup = function() {
    // Wait for the element to appear on page
    setTimeout(function() {
      that.$el.find('.page').first().addClass('current');
      that.$el.find('.prev').addClass('disabled');
    }, 300);
  };

  this.initialClip = function() {
    var clipAfter  = $('<a>').html(' ... ')
                       .addClass('clip').addClass('after'),
        clipBefore = $('<a>').html(' ... ')
                       .addClass('clip').addClass('before');
    clipAfter.insertBefore(this.$el.find('.page').last());
    clipBefore.insertAfter(this.$el.find('.page').first()).hide();

    if (this.numPages > this.numVisible) {
      for (var i = this.numVisible - 1; i < this.lastIndex; i++) {
        $(this.$el.find('.page')[i]).hide();
      }
    }
  };

  this.change = function($targetPage) {
    if ($targetPage.attr('class').indexOf('disabled') === -1) {
      this.loading();
      this.$currentPage = this.$el.find('.current'),
      this.currentNum = parseInt(this.$currentPage.html());
      this.$targetPage = $targetPage;

      if (this.$targetPage.attr('data') === 'prev') {
        if (this.currentNum === 1) {
          return;
        } else {
          this.targetNum = this.currentNum - 1;
          this.$targetPage = $(this.$el.find('.page')[this.targetNum - 1]);
        }
      } else if (this.$targetPage.attr('data') === 'next') {
        if (this.currentNum === this.numPages) {
          return;
        } else {
          this.targetNum = this.currentNum + 1;
          this.$targetPage = $(this.$el.find('.page')[this.targetNum - 1]);
        }
      } else {
        this.targetNum = parseInt(this.$targetPage.html());
      }

      this.targetIndex = this.$el.find('.page').index(this.$targetPage);
      this.transition();
      if (this.numPages > this.numVisible) {
        this.clip();
    }
    }
    return this.targetNum;
  };

  this.transition = function() {
    // Style selected page + back/forward buttons
    this.$currentPage.removeClass('current');
    this.$targetPage.css({'font-style': 'italic'});
    setTimeout(function() {
      that.$targetPage.addClass('current').css({'font-style': ''});
    }, 500);

    // Prev - next buttons
    this.$el.find('.disabled').removeClass('disabled');
    if (this.targetNum === this.numPages) {
      this.$el.find('.next').addClass('disabled');
    } else if (this.targetNum === 1) {
      this.$el.find('.prev').addClass('disabled');
    }
  };

  this.clip = function() {
    // Show 4 pages before and after target
    for (var p = 1; p < 5; p++) {
      $(this.$el.find('.page')[this.targetIndex+p]).show();
      $(this.$el.find('.page')[this.targetIndex-p]).show();
    }

    // Check if there's any more hidden pages after
    if (this.targetIndex+4 >= this.numPages) {
      this.$el.find('.clip.after').hide();
    } else {
      this.$el.find('.clip.after').show();
      // Hide leftover pages before last page
      var diff = this.lastIndex - (this.targetIndex+4) - 1;
      for (var j = 0; j < diff; j++) {
        $(this.$el.find('.page')[this.lastIndex - j-1]).hide();
      }
    }

    // Check if there's any more hidden pages before
    if (this.targetIndex-4 <= 0) {
      this.$el.find('.clip.before').hide();
    } else {
      this.$el.find('.clip.before').show();
      // Hide leftover pages after first page
      var diff = (this.targetIndex-4) - 1;
      for (var j = 0; j < diff; j++) {
        $(this.$el.find('.page')[j+1]).hide();
      }
    }

    // Edge cases
    // if (this.targetIndex < 4) {
    //   var diff = this.lastIndex - this.targetIndex - 1;
    //   for (var m = 1; m < diff; m++) {
    //     var page = this.$el.find('.page')[this.targetIndex+m];
    //     if (m < this.numVisible - this.targetIndex + 1) {
    //       $(page).show();
    //       console.log('show page ', page)
    //     } else {
    //       $(page).hide();
    //       console.log('hide page ', page)
    //     }

    //   }
    // } else if (this.targetIndex > 14) {
    //   var diff = this.lastIndex - this.targetIndex - 1;
    //   console.log(diff)
    //   for (var n = 1; n < diff; n++) {
    //     console.log(n)
    //     var page = this.$el.find('.page')[this.lastIndex-n];
    //     if (n > this.targetIndex - this.numVisible + 1) {
    //       $(page).show();
    //       console.log('show page ', page)
    //     } else {
    //       $(page).hide();
    //       console.log('hide page ', page)
    //     }
    //   }
    // }

  };

  this.loading = function() {
    var section = this.$el.parent(),
        channelList = section.find('.channel-list'),
        loader = section.find('.loader');
    loader.addClass('active');
    channelList.addClass('hidden');
  };

  this.doneLoading = function() {
    var section = this.$el.parent(),
        channelList = section.find('.channel-list'),
        loader = section.find('.loader');
    loader.removeClass('active');
    channelList.removeClass('hidden');
  };

  // Initialize pagination
  if (this.numPages > 1) {
    this.init();
  } else {
    this.$el.empty();
  }

  return this;
}
