<section id="balie" class="page visible noheader">
    <div class="content">
        <flex-slider slide="page in passen.pages" animation="slide" animation-speed="1000" slideshow-speed="10000" direction-nav="false" keyboard="false" slideshow="false" class="slides">
            <li>
                <div class="slidewrapper">
                    <div  class="row" ng-repeat="row in page.pagecontent.rows">
                            <div class="col" ng-repeat="item in row.items"><depotpas setenabledclass="false" setselectedclass="currentpas.pasnummer == item.pasnummer" itemselected="selectPas(item)"></depotpas></div>
                    </div>
                </div>
            </li>
        </flexslider>
    </div>
    <footer class="nobg">
        <div class="content">
            <nav class="change" ng-show="currentpas != null">
                <ul>
                    <li class="col1"><a href="#nieuw" class="btn fancybox" fancyboxinit="wijzigPas()" fancyboxok="savePasChange()" fancybox>wijzig</a></li>
                    <li class="col2"><div class="text"><span class="nummer">{{currentpas.pasnummer | formatpasnummer}}</span>: {{currentpas.mededeling}}</div></li>
                    <li class="col1"><a href="#" class="btn delete" ng-click="deletePas()" blockdefault>uitzetten</a></li>
                </ul>
            </nav>
            <nav class="actions" ng-show="currentpas == null">
                <ul>
                    <li><a href="#nieuw" class="btn fancybox" fancyboxinit="nieuwePas()" fancyboxok="savePasChange()" fancybox>nieuw</a></li>
                    <li><a href="#melding" class="btn fancybox" fancyboxok="saveMelding()" fancybox>melding</a></li>
                </ul>
            </nav>
            <nav class="tabs">
                <ul>
                    <li><a href="#/depot/edit" class="btn small active">balie</a></li>
                    <li><a href="#/studiezaal/edit" class="btn small">depot</a></li>
                </ul>
            </nav>
        </div>
    </footer>
</section>
<!-- popups -->
<section id="nieuw" class="popup">
    <div class="content">
        <div class="formfield row">
            <div class="col">
                <div class="nr"><span id="nieuw_tafelnummer_value">{{nieuwepas.pasnummer | formatpasnummer}}</span></div>
            </div>
            <div class="col">
                <label for="nieuw_tafelnummer">tafelnummer</label>
                <input type="text" id="nieuw_tafelnummer" name="nr" ng-maxlength="3" ng-pattern="/[0-9]+/" ng-model="nieuwepas.pasnummer" value=
                "">
            </div>
        </div>
        <div class="formfield row">
            <label for="nieuw_opmerking">opmerking</label>
            <textarea id="nieuw_opmerking" ng-model="nieuwepas.mededeling"></textarea>
        </div>
    </div>
    <footer>
        <a href="#" class="btn large submit">Bewaren</a>
    </footer>
</section>

<section id="melding" class="popup">
    <div class="content">
        <div class="formfield row">
            <label for="melding_text">melding</label>
            <textarea id="melding_text" class="large" ng-model="mededeling"></textarea>
        </div>
    </div>
    <footer>
        <a href="#" class="btn large submit">Bewaren</a>
    </footer>
</section>

