var div=document.querySelectorAll (".borderbottom");
console.log (div);
var locationMin =300 ;
window.addEventListener ("scroll",function()
{
    if (this.window.scrollY >locationMin)
    {
        div[0].style.visibility="visible"
    }
    else 
    {
        div[0].style.visibility ="hidden"
    }
})


