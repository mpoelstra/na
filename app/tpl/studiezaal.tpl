<section id="studiezaal" class="page visible nofooter">
    <header>
    	<div class="logo"></div>
        <h1 ng-show="currentSlideType != 'melding'">Onderstaande tafelnummers kunnen nieuwe stukken bij de balie halen</h1>
    </header>
    <div class="content">
            <flex-slider slide="page in passen.pages" animation="slide" progress-nav="true" animation-loop="false" animation-speed="1000" slideshow-speed="10000" direction-nav="false" keyboard="false" slideshow="true" class="slides" start-at="0" start="flexsliderStart()" before="flexsliderBefore()" after="flexsliderAfter()" end="flexsliderEnd()" progressend="progressEnd()">
	            <li ng-switch on="page.pagetype">
	            	<div class="slidewrapper" ng-switch-when="passen">
		            	<div  class="row" ng-repeat="row in page.pagecontent.rows">
		            			<div class="col" ng-repeat="item in row.items"><a class="nr" href="#"><span>{{item.pasnummer |formatpasnummer}}</span></a></div>
		            	</div>
	            	</div>
	            	<div class="slidewrapper" ng-switch-when="melding">
	            		<table class="row"><tr><td>{{page.pagecontent}}</td></tr></table>
	            	</div>
	            </li>
            </flexslider>
    </div>
</section>

