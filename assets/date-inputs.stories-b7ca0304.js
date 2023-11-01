import{r as u}from"./index-76fb7be0.js";import"./_commonjsHelpers-de833af9.js";var z={exports:{}},P={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var de=u,ie=Symbol.for("react.element"),ue=Symbol.for("react.fragment"),ce=Object.prototype.hasOwnProperty,me=de.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,fe={key:!0,ref:!0,__self:!0,__source:!0};function G(e,t,n){var o,f={},g=null,h=null;n!==void 0&&(g=""+n),t.key!==void 0&&(g=""+t.key),t.ref!==void 0&&(h=t.ref);for(o in t)ce.call(t,o)&&!fe.hasOwnProperty(o)&&(f[o]=t[o]);if(e&&e.defaultProps)for(o in t=e.defaultProps,t)f[o]===void 0&&(f[o]=t[o]);return{$$typeof:ie,type:e,key:g,ref:h,props:f,_owner:me.current}}P.Fragment=ue;P.jsx=G;P.jsxs=G;z.exports=P;var c=z.exports;function y(e,t){if(t.length<e)throw new TypeError(e+" argument"+(e>1?"s":"")+" required, but only "+t.length+" present")}function S(e){y(1,arguments);var t=Object.prototype.toString.call(e);return e instanceof Date||typeof e=="object"&&t==="[object Date]"?new Date(e.getTime()):typeof e=="number"||t==="[object Number]"?new Date(e):((typeof e=="string"||t==="[object String]")&&typeof console<"u"&&(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"),console.warn(new Error().stack)),new Date(NaN))}function ye(e){return y(1,arguments),e instanceof Date||typeof e=="object"&&Object.prototype.toString.call(e)==="[object Date]"}function ge(e){if(y(1,arguments),!ye(e)&&typeof e!="number")return!1;var t=S(e);return!isNaN(Number(t))}function R(e){y(1,arguments);var t=S(e),n=t.getDate();return n}function N(e){y(1,arguments);var t=S(e),n=t.getMonth();return n}function Y(e){return y(1,arguments),S(e).getFullYear()}function w(e,t){switch(e){case 2:return!t||t.toString().length<4||t%4==0&&t%100||t%400==0?29:28;case 9:case 4:case 6:case 11:return 30;default:return 31}}function he(e,t,n){const o=new Date(n,t-1,e);return t>=1&&t<13&&e>0&&e<=w(t,n)&&ge(o)}var r=(e=>(e.day="day",e.month="month",e.year="year",e))(r||{});function be({day:e,month:t,year:n}){const o=t?w(t,n):31;return{day:e&&e>o?o:e,month:t&&t>12?12:t,year:n&&n>9999?9999:n}}const i="react-date-inputs",D=u.forwardRef((e,t)=>c.jsx("input",{...e,ref:t}));D.displayName="DefaultInputComponent";const ve=e=>c.jsx("label",{...e}),Ce=({value:e,onChange:t,onBlur:n,dayPlaceholder:o="DD",monthPlaceholder:f="MM",yearPlaceholder:g="YYYY",className:h,label:I,disabled:J=!1,inputComponent:H=D,labelComponent:K=ve,inputComponentProps:Q={},labelComponentProps:X={},show:m=["day","month","year"],autoTab:Z=!1})=>{const ee=u.useRef(null),te=u.useRef(null),ne=u.useRef(null),j={[r.day]:ee,[r.month]:te,[r.year]:ne},ae={[r.day]:o,[r.month]:f,[r.year]:g},[b,re]=u.useState({[r.day]:R(e)||void 0,[r.month]:N(e)+1||void 0,[r.year]:Y(e)||void 0});u.useEffect(()=>{const{day:a=m.includes(r.day)?void 0:1,month:s=m.includes(r.month)?void 0:1,year:l=m.includes(r.year)?void 0:2020}=b,d=a===R(e)&&s===N(e)+1&&l===Y(e);t&&!d&&(a===void 0||s===void 0||l===void 0?t(void 0):he(a,s,l)&&l.toString().length===4?t(new Date(l,s-1,a)):t(void 0))},[b,t,m,e]);const oe=({day:a,month:s,year:l},d)=>{var V;const v=s?w(s,l):31,T=m.indexOf(d),pe=m[T+1];(d===r.day&&parseInt(a+"1",10)>v||d===r.month&&parseInt(s+"1",10)>12||d===r.year&&(l==null?void 0:l.toString().length)===4)&&((V=j[pe].current)==null||V.select())},se=(a,s)=>{const l=parseInt(a.target.value,10),d=l>=0?l:void 0,v={...b,[s]:d},T=be(v);Z&&oe(v,s),re(T)},le=a=>{const{currentTarget:s}=a;setTimeout(()=>{s.contains(document.activeElement)||n==null||n(a)},0)};return c.jsxs("div",{className:`${i}${h?` ${h}`:""}`,"data-testid":i,children:[I&&c.jsx(K,{className:`${i}__label`,"data-testid":`${i}__label`,...X,children:I}),c.jsx("div",{onBlur:le,className:`${i}__inputs-wrapper`,"data-testid":`${i}__inputs-wrapper`,children:m.map(a=>c.jsx(H,{type:"text",pattern:"[0-9]*",placeholder:ae[a],onChange:s=>{se(s,a)},value:b[a]??"",className:`${i}__${a}`,"data-testid":`${i}__${a}`,ref:j[a],disabled:J,maxLength:a==r.year?"4":"2",...Q},a))})]})};try{D.displayName="DefaultInputComponent",D.__docgenInfo={description:"",displayName:"DefaultInputComponent",props:{value:{defaultValue:null,description:"",name:"value",required:!1,type:{name:"Date"}},onChange:{defaultValue:null,description:"",name:"onChange",required:!1,type:{name:"((value?: Date) => void)"}},onBlur:{defaultValue:null,description:"",name:"onBlur",required:!1,type:{name:"((e: ChangeEvent<Element>) => undefined)"}},dayPlaceholder:{defaultValue:{value:"DD"},description:"",name:"dayPlaceholder",required:!1,type:{name:"string"}},monthPlaceholder:{defaultValue:{value:"MM"},description:"",name:"monthPlaceholder",required:!1,type:{name:"string"}},yearPlaceholder:{defaultValue:{value:"YYYY"},description:"",name:"yearPlaceholder",required:!1,type:{name:"string"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},label:{defaultValue:null,description:"",name:"label",required:!1,type:{name:"string"}},disabled:{defaultValue:{value:"false"},description:"",name:"disabled",required:!1,type:{name:"boolean"}},inputComponent:{defaultValue:null,description:"",name:"inputComponent",required:!1,type:{name:"ElementType<any>"}},labelComponent:{defaultValue:null,description:"",name:"labelComponent",required:!1,type:{name:"ElementType<any>"}},inputComponentProps:{defaultValue:{value:"{}"},description:"",name:"inputComponentProps",required:!1,type:{name:"Record<string, unknown>"}},labelComponentProps:{defaultValue:{value:"{}"},description:"",name:"labelComponentProps",required:!1,type:{name:"Record<string, unknown>"}},show:{defaultValue:{value:"['day', 'month', 'year']"},description:"",name:"show",required:!1,type:{name:'("day" | "month" | "year")[]'}},autoTab:{defaultValue:{value:"false"},description:"",name:"autoTab",required:!1,type:{name:"boolean"}}}}}catch{}const Te={component:Ce},p={args:{label:"Date",disabled:!1,show:["day","month","year"],autoTab:!1,dayPlaceholder:"DD",monthPlaceholder:"MM",yearPlaceholder:"YYYY"},argTypes:{show:{options:["day","month","year"],control:{type:"check"}},dayPlaceholder:{control:{type:"text"}},monthPlaceholder:{control:{type:"text"}},yearPlaceholder:{control:{type:"text"}}}},C={args:{...p.args,value:new Date(2022,6,20)},argTypes:p.argTypes},_={args:{...p.args,show:["year","month","day"]},argTypes:p.argTypes},_e=u.forwardRef(function(t,n){return c.jsx("input",{style:t.style,...t,ref:n})}),xe=e=>c.jsx("label",{style:{textTransform:"uppercase",fontFamily:"sans-serif",fontWeight:"bold",fontSize:"0.8rem"},...e}),x={args:{...p.args,inputComponent:_e,labelComponent:xe,inputComponentProps:{style:{padding:"6px",marginRight:"4px",marginTop:"0.2rem"}}},argTypes:{...p.argTypes,inputComponent:{table:{disable:!0}},labelComponent:{table:{disable:!0}}}};var E,q,O;p.parameters={...p.parameters,docs:{...(E=p.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    label: 'Date',
    disabled: false,
    show: ['day', 'month', 'year'],
    autoTab: false,
    dayPlaceholder: 'DD',
    monthPlaceholder: 'MM',
    yearPlaceholder: 'YYYY'
  },
  argTypes: {
    show: {
      options: ['day', 'month', 'year'],
      control: {
        type: 'check'
      }
    },
    dayPlaceholder: {
      control: {
        type: 'text'
      }
    },
    monthPlaceholder: {
      control: {
        type: 'text'
      }
    },
    yearPlaceholder: {
      control: {
        type: 'text'
      }
    }
  }
}`,...(O=(q=p.parameters)==null?void 0:q.docs)==null?void 0:O.source}}};var $,M,k;C.parameters={...C.parameters,docs:{...($=C.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    ...Simple.args,
    value: new Date(2022, 6, 20)
  },
  argTypes: Simple.argTypes
}`,...(k=(M=C.parameters)==null?void 0:M.docs)==null?void 0:k.source}}};var L,A,F;_.parameters={..._.parameters,docs:{...(L=_.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    ...Simple.args,
    show: ['year', 'month', 'day']
  },
  argTypes: Simple.argTypes
}`,...(F=(A=_.parameters)==null?void 0:A.docs)==null?void 0:F.source}}};var W,U,B;x.parameters={...x.parameters,docs:{...(W=x.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    ...Simple.args,
    inputComponent: InputComponent,
    labelComponent: LabelComponent,
    inputComponentProps: {
      style: {
        padding: '6px',
        marginRight: '4px',
        marginTop: '0.2rem'
      }
    }
  },
  argTypes: {
    ...Simple.argTypes,
    inputComponent: {
      table: {
        disable: true
      }
    },
    labelComponent: {
      table: {
        disable: true
      }
    }
  }
}`,...(B=(U=x.parameters)==null?void 0:U.docs)==null?void 0:B.source}}};const we=["Simple","PrePopulated","CustomInputOrder","WithCustomComponents"];export{_ as CustomInputOrder,C as PrePopulated,p as Simple,x as WithCustomComponents,we as __namedExportsOrder,Te as default};
//# sourceMappingURL=date-inputs.stories-b7ca0304.js.map
