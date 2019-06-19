export default (routers,data) => {
    generaMenu(routers,data)
}
function lazy(name,path) {
    let file = path.split('/')[1]
    console.log(file,name)
    return () => import(`@/views/${file}.vue`)
//   let file = name.split('_')[0]
//   if (name !== 'dashboard') {
//     return () => import(`@/page/${file}/${name}.vue`)
//   } else {
//     return () => import(`@/components/${name}.vue`)
//   }
}

function generaMenu(routers,data){
  data.forEach((item)=>{
    let menu = Object.assign({},item)
    menu.component = lazy(menu.component,menu.path)
    menu.name = menu.path.split('/')[1]
    console.log(menu)
    // if(item.children){
    //   menu.children = []
    //   generaMenu(menu.children,item.children)
    // }
    routers.push(menu)
  })
}
