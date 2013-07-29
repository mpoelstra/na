<section id="depot" class="page visible noheader">
    <div class="content columns20">
        <div class="row" ng-repeat="row in passen.rows">
            <div class="col" ng-repeat="item in row"><depotpas setenabledclass="item.ingeschakeld == '1'" setselectedclass="currentpas.pasnummer == item.pasnummer" itemselected="selectPas(item)"></depotpas></div>
        </div>
    </div>
    <footer>
        <div class="content">
            <nav class="change" ng-show="currentpas != null">
                <ul>
                    <li>
                    	<a href="#" class="btn" ng-click="togglePasState()" blockdefault>
                    		<span class="nummer">{{currentpas.pasnummer | formatpasnummer}}</span>
                    		<span>-</span>
                    		<span class="text" ng-show="currentpas.ingeschakeld == 0">aanzetten</span>
                    		<span class="text" ng-show="currentpas.ingeschakeld == 1">uitzetten</span>
                    	</a>
                    </li>
                </ul>
            </nav>
            <nav class="tabs">
                <ul>
                    <li><a href="#/depot/edit" class="btn">balie</a></li>
                    <li><a href="#/studiezaal/edit" class="btn">depot</a></li>
                </ul>
            </nav>
        </div>       	
    </footer>
</section>