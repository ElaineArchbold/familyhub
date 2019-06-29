$(document).ready(function () {

    /**
     * Fetches results to display when select or input filed is changed
     */

    $("select, input").change(function () {
        fetchResults();
    });

    /**
     * Function collects user input into search filters, and sends this to 
     * back end to be processed. When the filtered results are returned it 
     * starts the process to display the data in the browser.
     */
    function fetchResults() {

        let location = $("#townSelect").val();
        let category = $("#categorySelect").val();
        let days = $("#daysFilter").val();
        let inOut = $("#inOutFilter").val();

        let ageRangeCheckboxes = $('.age-range-js');
        let ageRangeIds = getCheckedIds(ageRangeCheckboxes);
        let otherDetailsCheckboxes = $('.in-out-js');
        let otherIds = getCheckedIds(otherDetailsCheckboxes);

        const data = {
            location: location,
            category: category,
            days: days,
            inOut: inOut,
            ageRangeIds: ageRangeIds,
            otherIds: otherIds,
        }

        showLoading();

        fetch('/activities', {
                method: 'POST',
                cors: '*same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(data => {
                hideLoading();
                searchResults = [];
                getFullData(data)
            })
            .catch(err => {
                hideLoading();
                alertModal('error');
                console.log(err);
            });
    }

    let searchResults = []

    /**
     * Takes search results data from fetch and pushes it into an array
     * that an be accessed outside of the fetch function.
     * @param {array} data 
     */

    function getFullData(data) {
        for (i = 0; i < data.length; i++) {
            searchResults.push(data[i]);
        }
        buildSearchResultsString(searchResults);
    }

    /**
     * Takes array of search results, and loops through them to add the data to a html block
     * for each card to display the search results
     * @param {array} searchResults 
     */

    function buildSearchResultsString(searchResults) {
        let searchResultsString = ''
        for (i = 0; i < searchResults.length; i++) {
            card = cardTemplate(searchResults[i]);
            searchResultsString += card;
        }
        /**
         * inserts cards into the page
         */
        $('#searchResults').html(searchResultsString);
    }

    /**
     * Builds each card with the data from the array, then returns the card
     * to be added to the final string of html to be inserted into the page.
     * @param {array object} searchResult 
     */

    function cardTemplate(searchResult) {
        const card = `
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
            <div class="card familyhub-card">
                <div class="card-img-wrapper">
                    <!-- Inline style used here for ease of placing background image with JS -->
                    <div class="card-picture" title="${searchResult.title}" style="background-image: url(${searchResult.imgUrl})">
                        <div class="location-text">${searchResult.address.town}</div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="card-title-wrapper">
                        <h4 class="card-title">${searchResult.title}</h4>
                    </div>
                    <div class="card-text-wrapper">
                        <p class="card-text">${searchResult.shortDescription}...</p>
                    </div>
                    <a class="readmore-link" href="{{ url_for('activity_listing_page', title=${searchResult.title}, activity_id=${searchResult._id})}}">Read More <i class="fas fa-arrow-circle-right"></i></a>
                </div>
            </div>
        </div>
        `
        return card;
    }

    /**
     * Clears all checked filters on search page
     */

    $('.clear-filters').click(function () {
        inputs = $('input')
        inputs.each(function () {
            $(this).prop('checked', false);
        })
    })

    function getCheckedIds(input) {
        ids = [];
        input.each(function () {
            if ($(this).prop("checked") == true) {
                ids.push(this.id);
            }
        })
        return ids;
    }


    /* Code credit: For animated side-nav taken from 
    https://www.w3schools.com/howto/howto_js_sidenav.asp 
    and edited to fit project needs as a pull out filters bar */

    $('.closeFiltersBtn').click(function () {
        closeFilters();
    })

    $('#openFiltersBtn').click(function () {
        openFilters();
    })

    function openFilters() {
        $('#filter-nav').css('left', '0');
        $('main, footer, nav').css('opacity', '0.35', 'pointer-events', 'none');
    }

    function closeFilters() {
        $('#filter-nav').css('left', '-275px');
        $('main, footer, nav').css('opacity', '1', 'pointer-events', 'auto');
    }

    fetchResults();
});