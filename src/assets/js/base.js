import router from '../../router'

export function dateFormat(timeDate,type){
  function add0(m){return m<10?'0'+m:m }
  var time = new Date(timeDate);
  var y = time.getFullYear();
  var m = time.getMonth()+1;
  var d = time.getDate();
  var h = time.getHours();
  var mm = time.getMinutes();
  var s = time.getSeconds();
  if(type == 'hour'){
    return add0(h)+':'+add0(mm)+':'+add0(s); 
  }else if( type == 'noyear'){
    return add0(m)+'-'+add0(d)
  }else if( type == 'day'){
    return y+'-'+add0(m)+'-'+add0(d)
  }else{
    return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
  }
}

export function getQueryString(key){
  var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
  var result = window.location.search.substr(1).match(reg);
  return result ? decodeURIComponent(result[2]) : null;
}

export function getLastTime(string){
  var yearArray = string.split("T");
  var hourArray = yearArray[1].split(".");
  var str = yearArray[0]+" "+hourArray[0];
  return str;
}


export function LoginOut(){
  localStorage.removeItem('eleToken')
  localStorage.removeItem('store')
  localStorage.removeItem("user");
  router.push('/login')
}


