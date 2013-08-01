<section id="attendering" class="page visible noheader">
    <div class="content columns2">
        <div class="row" refreshtimer="30000" refreshfunction="getPassen()">

            <div class="col" ng-repeat="col in passen.cols">
                <div class="todo" ng-repeat="item in col">
                    <div class="inner">
                        <div class="nr"><span>{{item.pasnummer}}</span></div>
                        <div class="message"><table><tr><td>{{item.mededeling}}</td></tr></table></div>
                        <span class="issue">{{item.volgnummer}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <footer>
        <div class="content">
            <div class="total">
                <div class="label"><span>totaal</span></div>
                <div class="nr"><span>{{pascount}}</span></div>
            </div>
        </div>
    </footer>
</section>
