(this["webpackJsonproowix-test"]=this["webpackJsonproowix-test"]||[]).push([[0],{11:function(e,t,n){e.exports=n(18)},17:function(e,t,n){},18:function(e,t,n){"use strict";n.r(t);var l=n(0),a=n.n(l),r=n(6),o=n.n(r),c=n(2),i=n(7),s=n(8),u=n(10),d=n(9),m=(n(16),n(17),function(e){var t=e.isRight,n=e.selectionCoords,r=e.setSelected,o=Object(l.useRef)(null),c=function(e,t){if(!e||!function(e){return null!==(null===e||void 0===e?void 0:e.start.x)&&null!==(null===e||void 0===e?void 0:e.start.y)&&null!==(null===e||void 0===e?void 0:e.end.x)&&null!==(null===e||void 0===e?void 0:e.end.y)}(t))return!1;var n=e.getBoundingClientRect(),l=n.x,a=l+n.width,r=window.pageYOffset+n.y,o=r+n.height,c=Math.min(null===t||void 0===t?void 0:t.start.x,null===t||void 0===t?void 0:t.end.x),i=Math.max(null===t||void 0===t?void 0:t.start.x,null===t||void 0===t?void 0:t.end.x),s=Math.min(null===t||void 0===t?void 0:t.start.y,null===t||void 0===t?void 0:t.end.y),u=Math.max(null===t||void 0===t?void 0:t.start.y,null===t||void 0===t?void 0:t.end.y);return a>c&&l<i&&o>s&&r<u}(o.current,n);Object(l.useEffect)((function(){r(c)}),[c]);var i="table__cell ";return i+=c?"table__cell_selected ":"",i+=t?"table__cell_right":"",a.a.createElement("td",{ref:o,className:i})});var f=function(e){var t=e.matrix,n=e.selectionCoords,l=e.setSelectedCell,r=function(e){for(var t=["\u043f\u043d","\u0432\u0442","\u0441\u0440","\u0447\u0442","\u043f\u0442"],n=[a.a.createElement("td",{key:7})],l=0;l<e;l++)n.push(a.a.createElement("td",{key:l,className:"table__head-cell"},t[l]));return a.a.createElement("thead",null,a.a.createElement("tr",null,n))}(t[1].length),o=function(){var e=t.map((function(e,t){var r=e.map((function(e,r){return a.a.createElement(m,{key:r,isRight:!!e,selectionCoords:n,matrixPosition:[t,r],setSelected:function(e){return l([t,r],e)}})}));return a.a.createElement("tr",{key:t},a.a.createElement("td",{className:"table__day-number"},"\u043d\u043e\u043c\u0435\u0440 ",t+1),r)}));return a.a.createElement("tbody",null,e)}();return a.a.createElement("table",{className:"table"},r,o)};var v=n(1),h=function(e){var t,n=e.setSelectionCoords,r=e.handleStopSelection,o=Object(l.useState)(!1),c=Object(v.a)(o,2),i=c[0],s=c[1],u=Object(l.useState)([null,null]),d=Object(v.a)(u,2),m=d[0],f=d[1],h=Object(l.useState)([null,null]),p=Object(v.a)(h,2),b=p[0],y=p[1],_=Object(l.useRef)(null);function C(e){s(!0),f([e.pageX,e.pageY]),y([e.pageX,e.pageY]),document.addEventListener("mousemove",x),document.addEventListener("mouseup",S)}function x(e){y([e.pageX,e.pageY])}function S(){s(!1),f([null,null]),y([null,null]),n({start:{x:null,y:null},end:{x:null,y:null}}),r(),document.removeEventListener("mousemove",x),_.current.removeEventListener("mouseup",S)}return Object(l.useEffect)((function(){var e=_.current;return e.addEventListener("mousedown",C),function(){return e.removeEventListener("mousedown",C)}}),[]),Object(l.useEffect)((function(){E(m,b)&&n({start:{x:m[0],y:m[1]},end:{x:b[0],y:b[1]}})}),[m[0],m[1],b[0],b[1]]),E(m,b)&&(t=function(e,t){var n=Math.min(e[0],t[0]),l=Math.min(e[1],t[1]),a=Math.abs(t[0]-e[0]),r=Math.abs(t[1]-e[1]);return{left:n,top:l,width:a,height:r}}(m,b)),a.a.createElement("div",{className:"selection-layer",ref:_},i&&a.a.createElement("div",{className:"selection-layer__selection",style:t}))};function E(e,t){return null!==e[0]&&null!==e[1]&&null!==t[0]&&null!==t[1]}var p=function(e){var t=e.isRight,n=e.handleChangeStatus,r=Object(l.useState)(t),o=Object(v.a)(r,2),c=o[0],i=o[1];var s="editor__cell ";return c&&(s+="editor__cell_checked"),a.a.createElement("td",{onClick:function(){i(!c),n(!c)},className:s})},b=function(e){var t=e.matrixCopy,n=e.cellsPosition,r=e.closeEditor,o=e.applyChanges,i=Object(l.useState)(t),s=Object(v.a)(i,2),u=s[0],d=s[1],m=function(e,t){for(var n=["\u043f\u043d","\u0432\u0442","\u0441\u0440","\u0447\u0442","\u043f\u0442"],l=[a.a.createElement("td",{key:7})],r=e;r<=t;r++)l.push(a.a.createElement("td",{key:r,className:"editor__head-cell"},n[r]));return a.a.createElement("thead",null,a.a.createElement("tr",null,l))}(n.start.cell,n.end.cell),f=function(){for(var e=[],l=function(l){for(var r=[],o=function(e){r.push(a.a.createElement(p,{key:e,isRight:!!t[l][e],handleChangeStatus:function(t){var n=u.map((function(e){return Object(c.a)(e)}));n[l][e]=t?1:0,d(n)}}))},i=n.start.cell;i<=n.end.cell;i++)o(i);e.push(a.a.createElement("tr",{key:l},a.a.createElement("td",{className:"editor__day-number"},"\u043d\u043e\u043c\u0435\u0440 ",l+1),r))},r=n.start.row;r<=n.end.row;r++)l(r);return e.push(function(e,t){for(var n=[],l=e.start.cell;l<=e.end.cell+1;l++)n.push(a.a.createElement("td",{className:"editor__fake-cell",key:l}));return a.a.createElement("tr",{key:t},n)}(n,u.length)),a.a.createElement("tbody",null,e)}();return a.a.createElement("div",{className:"background-locker"},a.a.createElement("div",{className:"editor"},a.a.createElement("table",{className:"editor__table"},m,f),a.a.createElement("button",{className:"editor__button editor__button_type_decline",onClick:r},"\u041e\u0442\u043c\u0435\u043d\u0438\u0442\u044c"),a.a.createElement("button",{className:"editor__button editor__button_type_accept",onClick:function(){return o(u)}},"\u041f\u0440\u0438\u043c\u0435\u043d\u0438\u0442\u044c")))};var y=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(){var e;Object(i.a)(this,n);for(var l=arguments.length,a=new Array(l),r=0;r<l;r++)a[r]=arguments[r];return(e=t.call.apply(t,[this].concat(a))).state={matrix:[[1,0,1,0,0],[0,0,0,0,0],[1,0,1,0,0],[0,0,0,0,0]],selectionCoords:{start:{x:null,y:null},end:{x:null,y:null}},selectedMatrix:[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],openEditor:!1,editCellsPosition:{start:{row:-1,cell:-1},end:{row:-1,cell:-1}}},e.setSelectedCell=function(t,n){e.setState((function(e){var l=e.selectedMatrix.map((function(e){return Object(c.a)(e)}));return l[t[0]][t[1]]=n?1:0,{selectedMatrix:l}}))},e.setSelectionCoords=function(t){e.setState({selectionCoords:t})},e.handleStopSelection=function(){var t=e.state.selectedMatrix.map((function(e){return Object(c.a)(e)})),n=e.state.matrix.length-1,l=e.state.matrix[0].length-1,a=null,r=null;t.forEach((function(e,o){e.forEach((function(e,c){!a&&e&&(a=[o,c]),!a||!e||o!==n&&t[o+1][c]||c!==l&&t[o][c+1]||(r=[o,c])}))})),a&&r&&e.setState({openEditor:!0,editCellsPosition:{start:{row:a[0],cell:a[1]},end:{row:r[0],cell:r[1]}}})},e.handleCloseEditor=function(){e.setState({openEditor:!1,editCellsPosition:{start:{row:-1,cell:-1},end:{row:-1,cell:-1}}})},e.handleApplyEditorChanges=function(t){e.setState({matrix:t,openEditor:!1,editCellsPosition:{start:{row:-1,cell:-1},end:{row:-1,cell:-1}}})},e}return Object(s.a)(n,[{key:"render",value:function(){var e=this.state,t=e.matrix,n=e.selectionCoords,l=e.openEditor,r=e.editCellsPosition,o=t.map((function(e){return Object(c.a)(e)}));return a.a.createElement(a.a.Fragment,null,a.a.createElement(f,{matrix:t,selectionCoords:n,setSelectedCell:this.setSelectedCell}),a.a.createElement(h,{setSelectionCoords:this.setSelectionCoords,handleStopSelection:this.handleStopSelection}),l&&a.a.createElement(b,{matrixCopy:o,cellsPosition:r,closeEditor:this.handleCloseEditor,applyChanges:this.handleApplyEditorChanges}))}}]),n}(a.a.Component);o.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(y,null)),document.getElementById("root"))}},[[11,1,2]]]);
//# sourceMappingURL=main.f3f6d1d9.chunk.js.map