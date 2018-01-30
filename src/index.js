import {FB, FacebookApiException} from 'fb';
import Preview from './Preview/Preview'
import icon from './icon.png'

export const fn = ({term, display, actions}) => {

  if (localStorage.getItem("accessToken") != null) {
    FB.setAccessToken(localStorage.getItem("accessToken"));
  }

  var search = (searchTerm) => {
    const q = encodeURIComponent('ciao')
    actions.open(searchTerm)
    actions.hideWindow()
  }

  const regex = /((\bfacebook\b)|(\bf\b))+\s/g;
  const regexS = /((\bf\b))+\s/g;
  const token = /(\btoken\b)+\s/g;
  var found = term.match(regex)
  var sterm = ''
  var uri = ''
  var list = []
  var response = ''
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
        type: 'user'
      }, function(res) {
        if (!res || res.error) {
          console.log(
            !res
            ? 'error occurred'
            : res.error);
          return;
        }
        console.log(res.data[0].id);
        console.log(res.data[0].name);
        uri = 'https://facebook.com/' + res.data[0].id
        for (var i = 0; i < 8; i++) {

          var img = res.data[i].id + '/picture'

          list = [
            ...list, {
              id: res.data[i].id,
              name: res.data[i].name,
              uri: 'https://facebook.com/' + res.data[i].id,
              img: img
            }
          ]
        }
      });
      response = 'Results for ' + sterm
      display({
        icon,
        title: response,
        subtitle: 'test',
        getPreview: () => <Preview person={list}/>
      });

    }

    //  switch case with post or research triggering            display({icon, title: response})

  } else {
    response = 'No matches for ' + sterm

    display({title: response})
  }
};
