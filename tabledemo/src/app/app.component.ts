import { Component } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  name = 'Angular';
  rows=[];
  constructor(){
    window["$"] = $;
    this.rows = this.gerRows();
  }
  makeid(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++){
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
  createRow(){
    return {
      name:this.makeid(this.getNumber()),
      std:this.makeid(this.getNumber()),
      age:this.makeid(this.getNumber()),
      year:this.makeid(this.getNumber()),
      section:this.makeid(this.getNumber())
    };
  }
  gerRows(){
    let rows = [];
    for(let i=0;i<100;i++){
      rows.push(this.createRow())
    }
    return rows;
  }
  getNumber(){
    return Math.ceil(Math.floor(Math.random() * 20));
  }
  ngAfterViewInit(){
    this.tableWidth();
    $(window).resize(()=>{
      this.tableWidth();
    });
  }
  tableWidth(){
    let $head = $('.scroll-table-header table tr:first');
    let $body = $('.scroll-table-body table tr:first');
    let $foot = $('.scroll-table-footer table');
    let headerCells = $head.find('th');
    $body.find('td').each((index,item)=>{
      console.log(headerCells[index],item,$(item).width());
      $(headerCells[index]).width($(item).width()-1);
      //$(headerCells[index]).find('div').width($(item).width()-26)
    })
  }
  getScrollbarWidth() {
    var outer = document.createElement("div");
    outer.style.visibility = "hidden";
    outer.style.width = "100px";
    outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps

    document.body.appendChild(outer);

    var widthNoScroll = outer.offsetWidth;
    // force scrollbars
    outer.style.overflow = "scroll";

    // add innerdiv
    var inner = document.createElement("div");
    inner.style.width = "100%";
    outer.appendChild(inner);        

    var widthWithScroll = inner.offsetWidth;

    // remove divs
    outer.parentNode.removeChild(outer);

    return widthNoScroll - widthWithScroll;
}
}
