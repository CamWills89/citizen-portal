# voting-app
Set up files
	Html, CSS, JS

2. Make requests to all api’s/make sure they work

3.	link to css framework, jQuery, maybe jQuery UI
	make sections for each feature

4. Create layout
	-where is each feature, does it redirect to a different page, etc.(if so create additional js file), make placeholder elements. 
	-Color scheme
	-create header and nav bar, and footer

5.  “Election near you” feature (MVP)
	-create modal that pops up either when first entering site or from “get started” button. Modal gives choice to either use current location (geo location api) or enter zip code
	-send input or geo location to google civics api
	-provide dropdown for scope of election (local, national)
	-extract upcoming election title, date, and polling locations (with map). Display.
	-display sample ballot (not sure where that comes from)

6. display info about candidates 
	(their website? Maybe we could extract their name from election info, then append their name as a button that makes a google search, and/or search on facebook/insta?) This may go to different page
	-create layout for this page


—————-


7. google calendar feature
	-create form to enter info
	-create event in google calendar 
	-set up reminders thru calendar event

8. “Need to register?” Feature 
	-link to rock the vote registration tool in html
	-place at bottom of page?


## things that work
in google civic api:
-use electionquery 
-pull up all available elections everywhere

-use voterinfoquery
-using voter info, pulls up links to general voting info for state, polling location finders (tho some are broken links), 

representatives call
-based on user address, pull up representative from national to local(dropdown menu)

### to do

-make 3 buttons on landing page: "get to know my representatives", "get my general voter info link", 

-make button that goes to rock the vote tool

-make form that pops up from 'get to know my represenatives' button. asks for address and scope, then redirects to new page with representatives 
        -dropdown menu again for scope using levels parameter (country-country, state-adminarea1, county-adminarea2)
        -clickable representative name that goes to modal with info including office, party, phone number, website

 "get more info about voting in your area" button
 -when clicked, calls voterinfoquery (w/ general election hardcoded, can have option for dropdown later if possible), get election info url for user area and display
 -register to vote tool in here
 -info about general election, reminder button
 -if rich can fix our problem, populate map with polling locations, 
 -figure out how to convert coordinates to an address       


-study google calendar api, see if we can make reminder for general election