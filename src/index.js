import {FB, FacebookApiException} from 'fb';
import Preview from './Preview/Preview'
import icon from './icon.png'

export const fn = ({term, display, actions}) => {

  var successResp =({display}, response) =>{
    display({
      icon,
      title: response,
      getPreview: () => <Preview person={list}/>
    });
  }
  var failedResp =({display}) =>{
    display({
      icon,
      title: "You have to set the access token first, type 'f token YOUR_ACCESS_TOKEN'",
      subtitle: "Click to get your access token",
      onSelect: () => search('https://developers.facebook.com/tools/explorer')
    });
  }


  var search =(searchTerm) =>{
      const q = encodeURIComponent('ciao')
      actions.open(searchTerm)
      actions.hideWindow()
    }



  if (localStorage.getItem("accessToken") != null) {
    FB.setAccessToken(localStorage.getItem("accessToken"));
  }


  const regex = /((\bfacebook\b)|(\bf\b))+\s/g;
  const regexS = /((\bf\b))+\s/g;
  const token = /(\btoken\b)+\s/g;
  var found = term.match(regex)
  var sterm = ''
  var uri = ''
  var img = ''
  var list = []
  var response = ''
  var errorCode = false
  if (found !== null) {

    if (term.match(regexS)) {
      sterm = term.slice(2)
    } else {
      sterm = term.slice(8)
    }
    console.log(sterm);
    if (sterm.match(token)) {
      sterm = sterm.slice(6)
      FB.setAccessToken(sterm);
      localStorage.setItem("accessToken", sterm)
      console.log(localStorage.getItem("accessToken"));
      console.log(sterm);
    } else {
      FB.api('search', {
        q: sterm,
        fields: [
          'id', 'name', 'picture'
        ],
        type: 'user'
      }, function(res) {
        if (!res || res.error) {
            errorCode= true
          console.log(
            !res
            ? 'error occurred'
            : res.error);
          return;
        }
        uri = 'https://facebook.com/' + res.data[0].id
        for (var i = 0; i < 8; i++) {
          list = [
            ...list, {
              id: res.data[i].id,
              name: res.data[i].name,
              uri: 'https://facebook.com/' + res.data[i].id,
              img: res.data[i].picture.data.url
            }
          ]
        }
      });
      response = 'Results for ' + sterm
      if (errorCode === true ) {
        console.log(errorCode);
        failedResp({display})
        // display({
        //   icon,
        //   title: "You have to set the access token first, type 'f token YOUR_ACCESS_TOKEN'",
        //   subtitle: "Click to get your access token",
        //   onSelect: () => return search('https://developers.facebook.com/tools/explorer')
        // });
      } else {
        if (localStorage.getItem("accessToken") !== null) {
          console.log("Done :)");
          successResp({display},response)
        } else {
          console.log("No Access Token");
          failedResp({display})
          // display({
          //   icon,
          //   title: "You have to set the access token first, type 'f token YOUR_ACCESS_TOKEN'",
          //   subtitle: "Click to get your access token",
          //   onSelect: () => return search('https://developers.facebook.com/tools/explorer')
          // });
        }
      }
    }

    //  switch case with post or research triggering            display({icon, title: response})

  } else {
    response = 'No matches for ' + sterm

    display({title: response})
  }
};
