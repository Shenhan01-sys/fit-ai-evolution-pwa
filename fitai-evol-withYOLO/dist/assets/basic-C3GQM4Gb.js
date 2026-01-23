import{i as e,C as t,A as i,O as n,a as o,b as r,c as s,d as a,E as l,R as c,e as d,f as u,g as h,h as p,H as g,j as f,r as w,k as m,T as b,S as y,M as v,l as x,m as $,n as C,o as k,w as E,p as R,q as T,s as I,t as S,W as P}from"./core-DTDfQNfi.js";import{n as A,r as L,c as B,o as O,U as j,i as N,t as M,e as W,a as z}from"./index-DRLW8ZIi.js";import{e as _}from"./index-BpfgcHrw.js";import{V as D}from"./index-BxKeiviE.js";import"./vendor-web3-t_Qnd68m.js";import"./vendor-react-DBi_nVUE.js";import"./vanilla-D-GFjGkU.js";import"./vendor-ai-CVwChM-s.js";var U=function(e,t,i,n){var o,r=arguments.length,s=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,n);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r<3?o(s):r>3?o(t,i,s):o(t,i))||s);return r>3&&s&&Object.defineProperty(t,i,s),s};let F=class extends e{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=t.state.connectors,this.count=i.state.count,this.filteredCount=i.state.filteredWallets.length,this.isFetchingRecommendedWallets=i.state.isFetchingRecommendedWallets,this.unsubscribe.push(t.subscribeKey("connectors",e=>this.connectors=e),i.subscribeKey("count",e=>this.count=e),i.subscribeKey("filteredWallets",e=>this.filteredCount=e.length),i.subscribeKey("isFetchingRecommendedWallets",e=>this.isFetchingRecommendedWallets=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const e=this.connectors.find(e=>"walletConnect"===e.id),{allWallets:t}=n.state;if(!e||"HIDE"===t)return null;if("ONLY_MOBILE"===t&&!o.isMobile())return null;const l=i.state.featured.length,c=this.count+l,d=c<10?c:10*Math.floor(c/10),u=this.filteredCount>0?this.filteredCount:d;let h=`${u}`;this.filteredCount>0?h=`${this.filteredCount}`:u<c&&(h=`${u}+`);const p=r.hasAnyConnection(s.CONNECTOR_ID.WALLET_CONNECT);return a`
      <wui-list-wallet
        name="Search Wallet"
        walletIcon="search"
        showAllWallets
        @click=${this.onAllWallets.bind(this)}
        tagLabel=${h}
        tagVariant="info"
        data-testid="all-wallets"
        tabIdx=${O(this.tabIdx)}
        .loading=${this.isFetchingRecommendedWallets}
        ?disabled=${p}
        size="sm"
      ></wui-list-wallet>
    `}onAllWallets(){l.sendEvent({type:"track",event:"CLICK_ALL_WALLETS"}),c.push("AllWallets",{redirectView:c.state.data?.redirectView})}};U([A()],F.prototype,"tabIdx",void 0),U([L()],F.prototype,"connectors",void 0),U([L()],F.prototype,"count",void 0),U([L()],F.prototype,"filteredCount",void 0),U([L()],F.prototype,"isFetchingRecommendedWallets",void 0),F=U([B("w3m-all-wallets-widget")],F);const V=d`
  :host {
    margin-top: ${({spacing:e})=>e[1]};
  }
  wui-separator {
    margin: ${({spacing:e})=>e[3]} calc(${({spacing:e})=>e[3]} * -1)
      ${({spacing:e})=>e[2]} calc(${({spacing:e})=>e[3]} * -1);
    width: calc(100% + ${({spacing:e})=>e[3]} * 2);
  }
`;var q=function(e,t,i,n){var o,r=arguments.length,s=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,n);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r<3?o(s):r>3?o(t,i,s):o(t,i))||s);return r>3&&s&&Object.defineProperty(t,i,s),s};let H=class extends e{constructor(){super(),this.unsubscribe=[],this.explorerWallets=i.state.explorerWallets,this.connections=r.state.connections,this.connectorImages=u.state.connectorImages,this.loadingTelegram=!1,this.unsubscribe.push(r.subscribeKey("connections",e=>this.connections=e),u.subscribeKey("connectorImages",e=>this.connectorImages=e),i.subscribeKey("explorerFilteredWallets",e=>{this.explorerWallets=e?.length?e:i.state.explorerWallets}),i.subscribeKey("explorerWallets",e=>{this.explorerWallets?.length||(this.explorerWallets=e)})),o.isTelegram()&&o.isIos()&&(this.loadingTelegram=!r.state.wcUri,this.unsubscribe.push(r.subscribeKey("wcUri",e=>this.loadingTelegram=!e)))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return a`
      <wui-flex flexDirection="column" gap="2"> ${this.connectorListTemplate()} </wui-flex>
    `}connectorListTemplate(){return h.connectorList().map((e,t)=>"connector"===e.kind?this.renderConnector(e,t):this.renderWallet(e,t))}getConnectorNamespaces(e){return"walletConnect"===e.subtype?[]:"multiChain"===e.subtype?e.connector.connectors?.map(e=>e.chain)||[]:[e.connector.chain]}renderConnector(e,t){const i=e.connector,n=p.getConnectorImage(i)||this.connectorImages[i?.imageId??""],o=(this.connections.get(i.chain)??[]).some(e=>g.isLowerCaseMatch(e.connectorId,i.id));let l,c;"walletConnect"===e.subtype?(l="qr code",c="accent"):"injected"===e.subtype||"announced"===e.subtype?(l=o?"connected":"installed",c=o?"info":"success"):(l=void 0,c=void 0);const d=r.hasAnyConnection(s.CONNECTOR_ID.WALLET_CONNECT),u=("walletConnect"===e.subtype||"external"===e.subtype)&&d;return a`
      <w3m-list-wallet
        displayIndex=${t}
        imageSrc=${O(n)}
        .installed=${!0}
        name=${i.name??"Unknown"}
        .tagVariant=${c}
        tagLabel=${O(l)}
        data-testid=${`wallet-selector-${i.id.toLowerCase()}`}
        size="sm"
        @click=${()=>this.onClickConnector(e)}
        tabIdx=${O(this.tabIdx)}
        ?disabled=${u}
        rdnsId=${O(i.explorerWallet?.rdns||void 0)}
        walletRank=${O(i.explorerWallet?.order)}
        .namespaces=${this.getConnectorNamespaces(e)}
      >
      </w3m-list-wallet>
    `}onClickConnector(e){const i=c.state.data?.redirectView;return"walletConnect"===e.subtype?(t.setActiveConnector(e.connector),void(o.isMobile()?c.push("AllWallets"):c.push("ConnectingWalletConnect",{redirectView:i}))):"multiChain"===e.subtype?(t.setActiveConnector(e.connector),void c.push("ConnectingMultiChain",{redirectView:i})):"injected"===e.subtype?(t.setActiveConnector(e.connector),void c.push("ConnectingExternal",{connector:e.connector,redirectView:i,wallet:e.connector.explorerWallet})):"announced"===e.subtype?"walletConnect"===e.connector.id?void(o.isMobile()?c.push("AllWallets"):c.push("ConnectingWalletConnect",{redirectView:i})):void c.push("ConnectingExternal",{connector:e.connector,redirectView:i,wallet:e.connector.explorerWallet}):void c.push("ConnectingExternal",{connector:e.connector,redirectView:i})}renderWallet(e,t){const i=e.wallet,n=p.getWalletImage(i),o=r.hasAnyConnection(s.CONNECTOR_ID.WALLET_CONNECT),l=this.loadingTelegram,c="recent"===e.subtype?"recent":void 0,d="recent"===e.subtype?"info":void 0;return a`
      <w3m-list-wallet
        displayIndex=${t}
        imageSrc=${O(n)}
        name=${i.name??"Unknown"}
        @click=${()=>this.onClickWallet(e)}
        size="sm"
        data-testid=${`wallet-selector-${i.id}`}
        tabIdx=${O(this.tabIdx)}
        ?loading=${l}
        ?disabled=${o}
        rdnsId=${O(i.rdns||void 0)}
        walletRank=${O(i.order)}
        tagLabel=${O(c)}
        .tagVariant=${d}
      >
      </w3m-list-wallet>
    `}onClickWallet(e){const i=c.state.data?.redirectView,n=f.state.activeChain;if("featured"===e.subtype)return void t.selectWalletConnector(e.wallet);if("recent"===e.subtype){if(this.loadingTelegram)return;return void t.selectWalletConnector(e.wallet)}if("custom"===e.subtype){if(this.loadingTelegram)return;return void c.push("ConnectingWalletConnect",{wallet:e.wallet,redirectView:i})}if(this.loadingTelegram)return;const o=n?t.getConnector({id:e.wallet.id,namespace:n}):void 0;o?c.push("ConnectingExternal",{connector:o,redirectView:i}):c.push("ConnectingWalletConnect",{wallet:e.wallet,redirectView:i})}};H.styles=V,q([A({type:Number})],H.prototype,"tabIdx",void 0),q([L()],H.prototype,"explorerWallets",void 0),q([L()],H.prototype,"connections",void 0),q([L()],H.prototype,"connectorImages",void 0),q([L()],H.prototype,"loadingTelegram",void 0),H=q([B("w3m-connector-list")],H);const K=d`
  :host {
    flex: 1;
    height: 100%;
  }

  button {
    width: 100%;
    height: 100%;
    display: inline-flex;
    align-items: center;
    padding: ${({spacing:e})=>e[1]} ${({spacing:e})=>e[2]};
    column-gap: ${({spacing:e})=>e[1]};
    color: ${({tokens:e})=>e.theme.textSecondary};
    border-radius: ${({borderRadius:e})=>e[20]};
    background-color: transparent;
    transition: background-color ${({durations:e})=>e.lg}
      ${({easings:e})=>e["ease-out-power-2"]};
    will-change: background-color;
  }

  /* -- Hover & Active states ----------------------------------------------------------- */
  button[data-active='true'] {
    color: ${({tokens:e})=>e.theme.textPrimary};
    background-color: ${({tokens:e})=>e.theme.foregroundTertiary};
  }

  button:hover:enabled:not([data-active='true']),
  button:active:enabled:not([data-active='true']) {
    wui-text,
    wui-icon {
      color: ${({tokens:e})=>e.theme.textPrimary};
    }
  }
`;var Y=function(e,t,i,n){var o,r=arguments.length,s=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,n);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r<3?o(s):r>3?o(t,i,s):o(t,i))||s);return r>3&&s&&Object.defineProperty(t,i,s),s};const J={lg:"lg-regular",md:"md-regular",sm:"sm-regular"},G={lg:"md",md:"sm",sm:"sm"};let Q=class extends e{constructor(){super(...arguments),this.icon="mobile",this.size="md",this.label="",this.active=!1}render(){return a`
      <button data-active=${this.active}>
        ${this.icon?a`<wui-icon size=${G[this.size]} name=${this.icon}></wui-icon>`:""}
        <wui-text variant=${J[this.size]}> ${this.label} </wui-text>
      </button>
    `}};Q.styles=[w,m,K],Y([A()],Q.prototype,"icon",void 0),Y([A()],Q.prototype,"size",void 0),Y([A()],Q.prototype,"label",void 0),Y([A({type:Boolean})],Q.prototype,"active",void 0),Q=Y([B("wui-tab-item")],Q);const X=d`
  :host {
    display: inline-flex;
    align-items: center;
    background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
    border-radius: ${({borderRadius:e})=>e[32]};
    padding: ${({spacing:e})=>e["01"]};
    box-sizing: border-box;
  }

  :host([data-size='sm']) {
    height: 26px;
  }

  :host([data-size='md']) {
    height: 36px;
  }
`;var Z=function(e,t,i,n){var o,r=arguments.length,s=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,n);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r<3?o(s):r>3?o(t,i,s):o(t,i))||s);return r>3&&s&&Object.defineProperty(t,i,s),s};let ee=class extends e{constructor(){super(...arguments),this.tabs=[],this.onTabChange=()=>null,this.size="md",this.activeTab=0}render(){return this.dataset.size=this.size,this.tabs.map((e,t)=>{const i=t===this.activeTab;return a`
        <wui-tab-item
          @click=${()=>this.onTabClick(t)}
          icon=${e.icon}
          size=${this.size}
          label=${e.label}
          ?active=${i}
          data-active=${i}
          data-testid="tab-${e.label?.toLowerCase()}"
        ></wui-tab-item>
      `})}onTabClick(e){this.activeTab=e,this.onTabChange(e)}};ee.styles=[w,m,X],Z([A({type:Array})],ee.prototype,"tabs",void 0),Z([A()],ee.prototype,"onTabChange",void 0),Z([A()],ee.prototype,"size",void 0),Z([L()],ee.prototype,"activeTab",void 0),ee=Z([B("wui-tabs")],ee);var te=function(e,t,i,n){var o,r=arguments.length,s=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,n);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r<3?o(s):r>3?o(t,i,s):o(t,i))||s);return r>3&&s&&Object.defineProperty(t,i,s),s};let ie=class extends e{constructor(){super(...arguments),this.platformTabs=[],this.unsubscribe=[],this.platforms=[],this.onSelectPlatfrom=void 0}disconnectCallback(){this.unsubscribe.forEach(e=>e())}render(){const e=this.generateTabs();return a`
      <wui-flex justifyContent="center" .padding=${["0","0","4","0"]}>
        <wui-tabs .tabs=${e} .onTabChange=${this.onTabChange.bind(this)}></wui-tabs>
      </wui-flex>
    `}generateTabs(){const e=this.platforms.map(e=>"browser"===e?{label:"Browser",icon:"extension",platform:"browser"}:"mobile"===e?{label:"Mobile",icon:"mobile",platform:"mobile"}:"qrcode"===e?{label:"Mobile",icon:"mobile",platform:"qrcode"}:"web"===e?{label:"Webapp",icon:"browser",platform:"web"}:"desktop"===e?{label:"Desktop",icon:"desktop",platform:"desktop"}:{label:"Browser",icon:"extension",platform:"unsupported"});return this.platformTabs=e.map(({platform:e})=>e),e}onTabChange(e){const t=this.platformTabs[e];t&&this.onSelectPlatfrom?.(t)}};te([A({type:Array})],ie.prototype,"platforms",void 0),te([A()],ie.prototype,"onSelectPlatfrom",void 0),ie=te([B("w3m-connecting-header")],ie);const ne=d`
  :host {
    display: block;
    width: 100px;
    height: 100px;
  }

  svg {
    width: 100px;
    height: 100px;
  }

  rect {
    fill: none;
    stroke: ${e=>e.colors.accent100};
    stroke-width: 3px;
    stroke-linecap: round;
    animation: dash 1s linear infinite;
  }

  @keyframes dash {
    to {
      stroke-dashoffset: 0px;
    }
  }
`;var oe=function(e,t,i,n){var o,r=arguments.length,s=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,n);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r<3?o(s):r>3?o(t,i,s):o(t,i))||s);return r>3&&s&&Object.defineProperty(t,i,s),s};let re=class extends e{constructor(){super(...arguments),this.radius=36}render(){return this.svgLoaderTemplate()}svgLoaderTemplate(){const e=this.radius>50?50:this.radius,t=36-e;return a`
      <svg viewBox="0 0 110 110" width="110" height="110">
        <rect
          x="2"
          y="2"
          width="106"
          height="106"
          rx=${e}
          stroke-dasharray="${116+t} ${245+t}"
          stroke-dashoffset=${360+1.75*t}
        />
      </svg>
    `}};re.styles=[w,ne],oe([A({type:Number})],re.prototype,"radius",void 0),re=oe([B("wui-loading-thumbnail")],re);const se=d`
  wui-flex {
    width: 100%;
    height: 52px;
    box-sizing: border-box;
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    border-radius: ${({borderRadius:e})=>e[5]};
    padding-left: ${({spacing:e})=>e[3]};
    padding-right: ${({spacing:e})=>e[3]};
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${({spacing:e})=>e[6]};
  }

  wui-text {
    color: ${({tokens:e})=>e.theme.textSecondary};
  }

  wui-icon {
    width: 12px;
    height: 12px;
  }
`;var ae=function(e,t,i,n){var o,r=arguments.length,s=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,n);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r<3?o(s):r>3?o(t,i,s):o(t,i))||s);return r>3&&s&&Object.defineProperty(t,i,s),s};let le=class extends e{constructor(){super(...arguments),this.disabled=!1,this.label="",this.buttonLabel=""}render(){return a`
      <wui-flex justifyContent="space-between" alignItems="center">
        <wui-text variant="lg-regular" color="inherit">${this.label}</wui-text>
        <wui-button variant="accent-secondary" size="sm">
          ${this.buttonLabel}
          <wui-icon name="chevronRight" color="inherit" size="inherit" slot="iconRight"></wui-icon>
        </wui-button>
      </wui-flex>
    `}};le.styles=[w,m,se],ae([A({type:Boolean})],le.prototype,"disabled",void 0),ae([A()],le.prototype,"label",void 0),ae([A()],le.prototype,"buttonLabel",void 0),le=ae([B("wui-cta-button")],le);const ce=d`
  :host {
    display: block;
    padding: 0 ${({spacing:e})=>e[5]} ${({spacing:e})=>e[5]};
  }
`;var de=function(e,t,i,n){var o,r=arguments.length,s=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,n);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r<3?o(s):r>3?o(t,i,s):o(t,i))||s);return r>3&&s&&Object.defineProperty(t,i,s),s};let ue=class extends e{constructor(){super(...arguments),this.wallet=void 0}render(){if(!this.wallet)return this.style.display="none",null;const{name:e,app_store:t,play_store:i,chrome_store:n,homepage:r}=this.wallet,s=o.isMobile(),l=o.isIos(),d=o.isAndroid(),u=[t,i,r,n].filter(Boolean).length>1,h=j.getTruncateString({string:e,charsStart:12,charsEnd:0,truncate:"end"});return u&&!s?a`
        <wui-cta-button
          label=${`Don't have ${h}?`}
          buttonLabel="Get"
          @click=${()=>c.push("Downloads",{wallet:this.wallet})}
        ></wui-cta-button>
      `:!u&&r?a`
        <wui-cta-button
          label=${`Don't have ${h}?`}
          buttonLabel="Get"
          @click=${this.onHomePage.bind(this)}
        ></wui-cta-button>
      `:t&&l?a`
        <wui-cta-button
          label=${`Don't have ${h}?`}
          buttonLabel="Get"
          @click=${this.onAppStore.bind(this)}
        ></wui-cta-button>
      `:i&&d?a`
        <wui-cta-button
          label=${`Don't have ${h}?`}
          buttonLabel="Get"
          @click=${this.onPlayStore.bind(this)}
        ></wui-cta-button>
      `:(this.style.display="none",null)}onAppStore(){this.wallet?.app_store&&o.openHref(this.wallet.app_store,"_blank")}onPlayStore(){this.wallet?.play_store&&o.openHref(this.wallet.play_store,"_blank")}onHomePage(){this.wallet?.homepage&&o.openHref(this.wallet.homepage,"_blank")}};ue.styles=[ce],de([A({type:Object})],ue.prototype,"wallet",void 0),ue=de([B("w3m-mobile-download-links")],ue);const he=d`
  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(3px);
    }
    50% {
      transform: translateX(-3px);
    }
    75% {
      transform: translateX(3px);
    }
    100% {
      transform: translateX(0);
    }
  }

  wui-flex:first-child:not(:only-child) {
    position: relative;
  }

  wui-wallet-image {
    width: 56px;
    height: 56px;
  }

  wui-loading-thumbnail {
    position: absolute;
  }

  wui-icon-box {
    position: absolute;
    right: calc(${({spacing:e})=>e[1]} * -1);
    bottom: calc(${({spacing:e})=>e[1]} * -1);
    opacity: 0;
    transform: scale(0.5);
    transition-property: opacity, transform;
    transition-duration: ${({durations:e})=>e.lg};
    transition-timing-function: ${({easings:e})=>e["ease-out-power-2"]};
    will-change: opacity, transform;
  }

  wui-text[align='center'] {
    width: 100%;
    padding: 0px ${({spacing:e})=>e[4]};
  }

  [data-error='true'] wui-icon-box {
    opacity: 1;
    transform: scale(1);
  }

  [data-error='true'] > wui-flex:first-child {
    animation: shake 250ms ${({easings:e})=>e["ease-out-power-2"]} both;
  }

  [data-retry='false'] wui-link {
    display: none;
  }

  [data-retry='true'] wui-link {
    display: block;
    opacity: 1;
  }

  w3m-mobile-download-links {
    padding: 0px;
    width: 100%;
  }
`;var pe=function(e,t,i,n){var o,r=arguments.length,s=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,n);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r<3?o(s):r>3?o(t,i,s):o(t,i))||s);return r>3&&s&&Object.defineProperty(t,i,s),s};class ge extends e{constructor(){super(),this.wallet=c.state.data?.wallet,this.connector=c.state.data?.connector,this.timeout=void 0,this.secondaryBtnIcon="refresh",this.onConnect=void 0,this.onRender=void 0,this.onAutoConnect=void 0,this.isWalletConnect=!0,this.unsubscribe=[],this.imageSrc=p.getConnectorImage(this.connector)??p.getWalletImage(this.wallet),this.name=this.wallet?.name??this.connector?.name??"Wallet",this.isRetrying=!1,this.uri=r.state.wcUri,this.error=r.state.wcError,this.ready=!1,this.showRetry=!1,this.label=void 0,this.secondaryBtnLabel="Try again",this.secondaryLabel="Accept connection request in the wallet",this.isLoading=!1,this.isMobile=!1,this.onRetry=void 0,this.unsubscribe.push(r.subscribeKey("wcUri",e=>{this.uri=e,this.isRetrying&&this.onRetry&&(this.isRetrying=!1,this.onConnect?.())}),r.subscribeKey("wcError",e=>this.error=e)),(o.isTelegram()||o.isSafari())&&o.isIos()&&r.state.wcUri&&this.onConnect?.()}firstUpdated(){this.onAutoConnect?.(),this.showRetry=!this.onAutoConnect}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),r.setWcError(!1),clearTimeout(this.timeout)}render(){this.onRender?.(),this.onShowRetry();const e=this.error?"Connection can be declined if a previous request is still active":this.secondaryLabel;let t="";return this.label?t=this.label:(t=`Continue in ${this.name}`,this.error&&(t="Connection declined")),a`
      <wui-flex
        data-error=${O(this.error)}
        data-retry=${this.showRetry}
        flexDirection="column"
        alignItems="center"
        .padding=${["10","5","5","5"]}
        gap="6"
      >
        <wui-flex gap="2" justifyContent="center" alignItems="center">
          <wui-wallet-image size="lg" imageSrc=${O(this.imageSrc)}></wui-wallet-image>

          ${this.error?null:this.loaderTemplate()}

          <wui-icon-box
            color="error"
            icon="close"
            size="sm"
            border
            borderColor="wui-color-bg-125"
          ></wui-icon-box>
        </wui-flex>

        <wui-flex flexDirection="column" alignItems="center" gap="6"> <wui-flex
          flexDirection="column"
          alignItems="center"
          gap="2"
          .padding=${["2","0","0","0"]}
        >
          <wui-text align="center" variant="lg-medium" color=${this.error?"error":"primary"}>
            ${t}
          </wui-text>
          <wui-text align="center" variant="lg-regular" color="secondary">${e}</wui-text>
        </wui-flex>

        ${this.secondaryBtnLabel?a`
                <wui-button
                  variant="neutral-secondary"
                  size="md"
                  ?disabled=${this.isRetrying||this.isLoading}
                  @click=${this.onTryAgain.bind(this)}
                  data-testid="w3m-connecting-widget-secondary-button"
                >
                  <wui-icon
                    color="inherit"
                    slot="iconLeft"
                    name=${this.secondaryBtnIcon}
                  ></wui-icon>
                  ${this.secondaryBtnLabel}
                </wui-button>
              `:null}
      </wui-flex>

      ${this.isWalletConnect?a`
              <wui-flex .padding=${["0","5","5","5"]} justifyContent="center">
                <wui-link
                  @click=${this.onCopyUri}
                  variant="secondary"
                  icon="copy"
                  data-testid="wui-link-copy"
                >
                  Copy link
                </wui-link>
              </wui-flex>
            `:null}

      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links></wui-flex>
      </wui-flex>
    `}onShowRetry(){if(this.error&&!this.showRetry){this.showRetry=!0;const e=this.shadowRoot?.querySelector("wui-button");e?.animate([{opacity:0},{opacity:1}],{fill:"forwards",easing:"ease"})}}onTryAgain(){r.setWcError(!1),this.onRetry?(this.isRetrying=!0,this.onRetry?.()):this.onConnect?.()}loaderTemplate(){const e=b.state.themeVariables["--w3m-border-radius-master"],t=e?parseInt(e.replace("px",""),10):4;return a`<wui-loading-thumbnail radius=${9*t}></wui-loading-thumbnail>`}onCopyUri(){try{this.uri&&(o.copyToClopboard(this.uri),y.showSuccess("Link copied"))}catch{y.showError("Failed to copy")}}}ge.styles=he,pe([L()],ge.prototype,"isRetrying",void 0),pe([L()],ge.prototype,"uri",void 0),pe([L()],ge.prototype,"error",void 0),pe([L()],ge.prototype,"ready",void 0),pe([L()],ge.prototype,"showRetry",void 0),pe([L()],ge.prototype,"label",void 0),pe([L()],ge.prototype,"secondaryBtnLabel",void 0),pe([L()],ge.prototype,"secondaryLabel",void 0),pe([L()],ge.prototype,"isLoading",void 0),pe([A({type:Boolean})],ge.prototype,"isMobile",void 0),pe([A()],ge.prototype,"onRetry",void 0);var fe=function(e,t,i,n){var o,r=arguments.length,s=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,n);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r<3?o(s):r>3?o(t,i,s):o(t,i))||s);return r>3&&s&&Object.defineProperty(t,i,s),s};let we=class extends ge{constructor(){if(super(),!this.wallet)throw new Error("w3m-connecting-wc-browser: No wallet provided");this.onConnect=this.onConnectProxy.bind(this),this.onAutoConnect=this.onConnectProxy.bind(this),l.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"browser",displayIndex:this.wallet?.display_index,walletRank:this.wallet.order,view:c.state.view}})}async onConnectProxy(){try{this.error=!1;const{connectors:e}=t.state,i=e.find(e=>"ANNOUNCED"===e.type&&e.info?.rdns===this.wallet?.rdns||"INJECTED"===e.type||e.name===this.wallet?.name);if(!i)throw new Error("w3m-connecting-wc-browser: No connector found");await r.connectExternal(i,i.chain),v.close()}catch(e){e instanceof x&&e.originalName===$.PROVIDER_RPC_ERROR_NAME.USER_REJECTED_REQUEST?l.sendEvent({type:"track",event:"USER_REJECTED",properties:{message:e.message}}):l.sendEvent({type:"track",event:"CONNECT_ERROR",properties:{message:e?.message??"Unknown"}}),this.error=!0}}};we=fe([B("w3m-connecting-wc-browser")],we);var me=function(e,t,i,n){var o,r=arguments.length,s=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,n);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r<3?o(s):r>3?o(t,i,s):o(t,i))||s);return r>3&&s&&Object.defineProperty(t,i,s),s};let be=class extends ge{constructor(){if(super(),!this.wallet)throw new Error("w3m-connecting-wc-desktop: No wallet provided");this.onConnect=this.onConnectProxy.bind(this),this.onRender=this.onRenderProxy.bind(this),l.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"desktop",displayIndex:this.wallet?.display_index,walletRank:this.wallet.order,view:c.state.view}})}onRenderProxy(){!this.ready&&this.uri&&(this.ready=!0,this.onConnect?.())}onConnectProxy(){if(this.wallet?.desktop_link&&this.uri)try{this.error=!1;const{desktop_link:e,name:t}=this.wallet,{redirect:i,href:n}=o.formatNativeUrl(e,this.uri);r.setWcLinking({name:t,href:n}),r.setRecentWallet(this.wallet),o.openHref(i,"_blank")}catch{this.error=!0}}};be=me([B("w3m-connecting-wc-desktop")],be);var ye=function(e,t,i,n){var o,r=arguments.length,s=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,n);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r<3?o(s):r>3?o(t,i,s):o(t,i))||s);return r>3&&s&&Object.defineProperty(t,i,s),s};let ve=class extends ge{constructor(){if(super(),this.btnLabelTimeout=void 0,this.redirectDeeplink=void 0,this.redirectUniversalLink=void 0,this.target=void 0,this.preferUniversalLinks=n.state.experimental_preferUniversalLinks,this.isLoading=!0,this.onConnect=()=>{C.onConnectMobile(this.wallet)},!this.wallet)throw new Error("w3m-connecting-wc-mobile: No wallet provided");this.secondaryBtnLabel="Open",this.secondaryLabel=k.CONNECT_LABELS.MOBILE,this.secondaryBtnIcon="externalLink",this.onHandleURI(),this.unsubscribe.push(r.subscribeKey("wcUri",()=>{this.onHandleURI()})),l.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"mobile",displayIndex:this.wallet?.display_index,walletRank:this.wallet.order,view:c.state.view}})}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.btnLabelTimeout)}onHandleURI(){this.isLoading=!this.uri,!this.ready&&this.uri&&(this.ready=!0,this.onConnect?.())}onTryAgain(){r.setWcError(!1),this.onConnect?.()}};ye([L()],ve.prototype,"redirectDeeplink",void 0),ye([L()],ve.prototype,"redirectUniversalLink",void 0),ye([L()],ve.prototype,"target",void 0),ye([L()],ve.prototype,"preferUniversalLinks",void 0),ye([L()],ve.prototype,"isLoading",void 0),ve=ye([B("w3m-connecting-wc-mobile")],ve);var xe={},$e={},Ce={};let ke;const Ee=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];Ce.getSymbolSize=function(e){if(!e)throw new Error('"version" cannot be null or undefined');if(e<1||e>40)throw new Error('"version" should be in range from 1 to 40');return 4*e+17},Ce.getSymbolTotalCodewords=function(e){return Ee[e]},Ce.getBCHDigit=function(e){let t=0;for(;0!==e;)t++,e>>>=1;return t},Ce.setToSJISFunction=function(e){if("function"!=typeof e)throw new Error('"toSJISFunc" is not a valid function.');ke=e},Ce.isKanjiModeEnabled=function(){return void 0!==ke},Ce.toSJIS=function(e){return ke(e)};var Re,Te={};function Ie(){this.buffer=[],this.length=0}(Re=Te).L={bit:1},Re.M={bit:0},Re.Q={bit:3},Re.H={bit:2},Re.isValid=function(e){return e&&void 0!==e.bit&&e.bit>=0&&e.bit<4},Re.from=function(e,t){if(Re.isValid(e))return e;try{return function(e){if("string"!=typeof e)throw new Error("Param is not a string");switch(e.toLowerCase()){case"l":case"low":return Re.L;case"m":case"medium":return Re.M;case"q":case"quartile":return Re.Q;case"h":case"high":return Re.H;default:throw new Error("Unknown EC Level: "+e)}}(e)}catch(yi){return t}},Ie.prototype={get:function(e){const t=Math.floor(e/8);return 1==(this.buffer[t]>>>7-e%8&1)},put:function(e,t){for(let i=0;i<t;i++)this.putBit(1==(e>>>t-i-1&1))},getLengthInBits:function(){return this.length},putBit:function(e){const t=Math.floor(this.length/8);this.buffer.length<=t&&this.buffer.push(0),e&&(this.buffer[t]|=128>>>this.length%8),this.length++}};var Se=Ie;function Pe(e){if(!e||e<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=e,this.data=new Uint8Array(e*e),this.reservedBit=new Uint8Array(e*e)}Pe.prototype.set=function(e,t,i,n){const o=e*this.size+t;this.data[o]=i,n&&(this.reservedBit[o]=!0)},Pe.prototype.get=function(e,t){return this.data[e*this.size+t]},Pe.prototype.xor=function(e,t,i){this.data[e*this.size+t]^=i},Pe.prototype.isReserved=function(e,t){return this.reservedBit[e*this.size+t]};var Ae=Pe,Le={};!function(e){const t=Ce.getSymbolSize;e.getRowColCoords=function(e){if(1===e)return[];const i=Math.floor(e/7)+2,n=t(e),o=145===n?26:2*Math.ceil((n-13)/(2*i-2)),r=[n-7];for(let t=1;t<i-1;t++)r[t]=r[t-1]-o;return r.push(6),r.reverse()},e.getPositions=function(t){const i=[],n=e.getRowColCoords(t),o=n.length;for(let e=0;e<o;e++)for(let t=0;t<o;t++)0===e&&0===t||0===e&&t===o-1||e===o-1&&0===t||i.push([n[e],n[t]]);return i}}(Le);var Be={};const Oe=Ce.getSymbolSize;Be.getPositions=function(e){const t=Oe(e);return[[0,0],[t-7,0],[0,t-7]]};var je={};!function(e){e.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const t=3,i=3,n=40,o=10;function r(t,i,n){switch(t){case e.Patterns.PATTERN000:return(i+n)%2==0;case e.Patterns.PATTERN001:return i%2==0;case e.Patterns.PATTERN010:return n%3==0;case e.Patterns.PATTERN011:return(i+n)%3==0;case e.Patterns.PATTERN100:return(Math.floor(i/2)+Math.floor(n/3))%2==0;case e.Patterns.PATTERN101:return i*n%2+i*n%3==0;case e.Patterns.PATTERN110:return(i*n%2+i*n%3)%2==0;case e.Patterns.PATTERN111:return(i*n%3+(i+n)%2)%2==0;default:throw new Error("bad maskPattern:"+t)}}e.isValid=function(e){return null!=e&&""!==e&&!isNaN(e)&&e>=0&&e<=7},e.from=function(t){return e.isValid(t)?parseInt(t,10):void 0},e.getPenaltyN1=function(e){const i=e.size;let n=0,o=0,r=0,s=null,a=null;for(let l=0;l<i;l++){o=r=0,s=a=null;for(let c=0;c<i;c++){let i=e.get(l,c);i===s?o++:(o>=5&&(n+=t+(o-5)),s=i,o=1),i=e.get(c,l),i===a?r++:(r>=5&&(n+=t+(r-5)),a=i,r=1)}o>=5&&(n+=t+(o-5)),r>=5&&(n+=t+(r-5))}return n},e.getPenaltyN2=function(e){const t=e.size;let n=0;for(let i=0;i<t-1;i++)for(let o=0;o<t-1;o++){const t=e.get(i,o)+e.get(i,o+1)+e.get(i+1,o)+e.get(i+1,o+1);4!==t&&0!==t||n++}return n*i},e.getPenaltyN3=function(e){const t=e.size;let i=0,o=0,r=0;for(let n=0;n<t;n++){o=r=0;for(let s=0;s<t;s++)o=o<<1&2047|e.get(n,s),s>=10&&(1488===o||93===o)&&i++,r=r<<1&2047|e.get(s,n),s>=10&&(1488===r||93===r)&&i++}return i*n},e.getPenaltyN4=function(e){let t=0;const i=e.data.length;for(let n=0;n<i;n++)t+=e.data[n];return Math.abs(Math.ceil(100*t/i/5)-10)*o},e.applyMask=function(e,t){const i=t.size;for(let n=0;n<i;n++)for(let o=0;o<i;o++)t.isReserved(o,n)||t.xor(o,n,r(e,o,n))},e.getBestMask=function(t,i){const n=Object.keys(e.Patterns).length;let o=0,r=1/0;for(let s=0;s<n;s++){i(s),e.applyMask(s,t);const n=e.getPenaltyN1(t)+e.getPenaltyN2(t)+e.getPenaltyN3(t)+e.getPenaltyN4(t);e.applyMask(s,t),n<r&&(r=n,o=s)}return o}}(je);var Ne={};const Me=Te,We=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],ze=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];Ne.getBlocksCount=function(e,t){switch(t){case Me.L:return We[4*(e-1)+0];case Me.M:return We[4*(e-1)+1];case Me.Q:return We[4*(e-1)+2];case Me.H:return We[4*(e-1)+3];default:return}},Ne.getTotalCodewordsCount=function(e,t){switch(t){case Me.L:return ze[4*(e-1)+0];case Me.M:return ze[4*(e-1)+1];case Me.Q:return ze[4*(e-1)+2];case Me.H:return ze[4*(e-1)+3];default:return}};var _e={},De={};const Ue=new Uint8Array(512),Fe=new Uint8Array(256);!function(){let e=1;for(let t=0;t<255;t++)Ue[t]=e,Fe[e]=t,e<<=1,256&e&&(e^=285);for(let t=255;t<512;t++)Ue[t]=Ue[t-255]}(),De.log=function(e){if(e<1)throw new Error("log("+e+")");return Fe[e]},De.exp=function(e){return Ue[e]},De.mul=function(e,t){return 0===e||0===t?0:Ue[Fe[e]+Fe[t]]},function(e){const t=De;e.mul=function(e,i){const n=new Uint8Array(e.length+i.length-1);for(let o=0;o<e.length;o++)for(let r=0;r<i.length;r++)n[o+r]^=t.mul(e[o],i[r]);return n},e.mod=function(e,i){let n=new Uint8Array(e);for(;n.length-i.length>=0;){const e=n[0];for(let r=0;r<i.length;r++)n[r]^=t.mul(i[r],e);let o=0;for(;o<n.length&&0===n[o];)o++;n=n.slice(o)}return n},e.generateECPolynomial=function(i){let n=new Uint8Array([1]);for(let o=0;o<i;o++)n=e.mul(n,new Uint8Array([1,t.exp(o)]));return n}}(_e);const Ve=_e;function qe(e){this.genPoly=void 0,this.degree=e,this.degree&&this.initialize(this.degree)}qe.prototype.initialize=function(e){this.degree=e,this.genPoly=Ve.generateECPolynomial(this.degree)},qe.prototype.encode=function(e){if(!this.genPoly)throw new Error("Encoder not initialized");const t=new Uint8Array(e.length+this.degree);t.set(e);const i=Ve.mod(t,this.genPoly),n=this.degree-i.length;if(n>0){const e=new Uint8Array(this.degree);return e.set(i,n),e}return i};var He=qe,Ke={},Ye={},Je={isValid:function(e){return!isNaN(e)&&e>=1&&e<=40}},Ge={};const Qe="[0-9]+";let Xe="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";Xe=Xe.replace(/u/g,"\\u");const Ze="(?:(?![A-Z0-9 $%*+\\-./:]|"+Xe+")(?:.|[\r\n]))+";Ge.KANJI=new RegExp(Xe,"g"),Ge.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),Ge.BYTE=new RegExp(Ze,"g"),Ge.NUMERIC=new RegExp(Qe,"g"),Ge.ALPHANUMERIC=new RegExp("[A-Z $%*+\\-./:]+","g");const et=new RegExp("^"+Xe+"$"),tt=new RegExp("^"+Qe+"$"),it=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");Ge.testKanji=function(e){return et.test(e)},Ge.testNumeric=function(e){return tt.test(e)},Ge.testAlphanumeric=function(e){return it.test(e)},function(e){const t=Je,i=Ge;e.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},e.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},e.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},e.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},e.MIXED={bit:-1},e.getCharCountIndicator=function(e,i){if(!e.ccBits)throw new Error("Invalid mode: "+e);if(!t.isValid(i))throw new Error("Invalid version: "+i);return i>=1&&i<10?e.ccBits[0]:i<27?e.ccBits[1]:e.ccBits[2]},e.getBestModeForData=function(t){return i.testNumeric(t)?e.NUMERIC:i.testAlphanumeric(t)?e.ALPHANUMERIC:i.testKanji(t)?e.KANJI:e.BYTE},e.toString=function(e){if(e&&e.id)return e.id;throw new Error("Invalid mode")},e.isValid=function(e){return e&&e.bit&&e.ccBits},e.from=function(t,i){if(e.isValid(t))return t;try{return function(t){if("string"!=typeof t)throw new Error("Param is not a string");switch(t.toLowerCase()){case"numeric":return e.NUMERIC;case"alphanumeric":return e.ALPHANUMERIC;case"kanji":return e.KANJI;case"byte":return e.BYTE;default:throw new Error("Unknown mode: "+t)}}(t)}catch(yi){return i}}}(Ye),function(e){const t=Ce,i=Ne,n=Te,o=Ye,r=Je,s=t.getBCHDigit(7973);function a(e,t){return o.getCharCountIndicator(e,t)+4}function l(e,t){let i=0;return e.forEach(function(e){const n=a(e.mode,t);i+=n+e.getBitsLength()}),i}e.from=function(e,t){return r.isValid(e)?parseInt(e,10):t},e.getCapacity=function(e,n,s){if(!r.isValid(e))throw new Error("Invalid QR Code version");void 0===s&&(s=o.BYTE);const l=8*(t.getSymbolTotalCodewords(e)-i.getTotalCodewordsCount(e,n));if(s===o.MIXED)return l;const c=l-a(s,e);switch(s){case o.NUMERIC:return Math.floor(c/10*3);case o.ALPHANUMERIC:return Math.floor(c/11*2);case o.KANJI:return Math.floor(c/13);case o.BYTE:default:return Math.floor(c/8)}},e.getBestVersionForData=function(t,i){let r;const s=n.from(i,n.M);if(Array.isArray(t)){if(t.length>1)return function(t,i){for(let n=1;n<=40;n++)if(l(t,n)<=e.getCapacity(n,i,o.MIXED))return n}(t,s);if(0===t.length)return 1;r=t[0]}else r=t;return function(t,i,n){for(let o=1;o<=40;o++)if(i<=e.getCapacity(o,n,t))return o}(r.mode,r.getLength(),s)},e.getEncodedBits=function(e){if(!r.isValid(e)||e<7)throw new Error("Invalid QR Code version");let i=e<<12;for(;t.getBCHDigit(i)-s>=0;)i^=7973<<t.getBCHDigit(i)-s;return e<<12|i}}(Ke);var nt={};const ot=Ce,rt=ot.getBCHDigit(1335);nt.getEncodedBits=function(e,t){const i=e.bit<<3|t;let n=i<<10;for(;ot.getBCHDigit(n)-rt>=0;)n^=1335<<ot.getBCHDigit(n)-rt;return 21522^(i<<10|n)};var st={};const at=Ye;function lt(e){this.mode=at.NUMERIC,this.data=e.toString()}lt.getBitsLength=function(e){return 10*Math.floor(e/3)+(e%3?e%3*3+1:0)},lt.prototype.getLength=function(){return this.data.length},lt.prototype.getBitsLength=function(){return lt.getBitsLength(this.data.length)},lt.prototype.write=function(e){let t,i,n;for(t=0;t+3<=this.data.length;t+=3)i=this.data.substr(t,3),n=parseInt(i,10),e.put(n,10);const o=this.data.length-t;o>0&&(i=this.data.substr(t),n=parseInt(i,10),e.put(n,3*o+1))};var ct=lt;const dt=Ye,ut=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function ht(e){this.mode=dt.ALPHANUMERIC,this.data=e}ht.getBitsLength=function(e){return 11*Math.floor(e/2)+e%2*6},ht.prototype.getLength=function(){return this.data.length},ht.prototype.getBitsLength=function(){return ht.getBitsLength(this.data.length)},ht.prototype.write=function(e){let t;for(t=0;t+2<=this.data.length;t+=2){let i=45*ut.indexOf(this.data[t]);i+=ut.indexOf(this.data[t+1]),e.put(i,11)}this.data.length%2&&e.put(ut.indexOf(this.data[t]),6)};var pt=ht;const gt=_,ft=Ye;function wt(e){this.mode=ft.BYTE,"string"==typeof e&&(e=gt(e)),this.data=new Uint8Array(e)}wt.getBitsLength=function(e){return 8*e},wt.prototype.getLength=function(){return this.data.length},wt.prototype.getBitsLength=function(){return wt.getBitsLength(this.data.length)},wt.prototype.write=function(e){for(let t=0,i=this.data.length;t<i;t++)e.put(this.data[t],8)};var mt=wt;const bt=Ye,yt=Ce;function vt(e){this.mode=bt.KANJI,this.data=e}vt.getBitsLength=function(e){return 13*e},vt.prototype.getLength=function(){return this.data.length},vt.prototype.getBitsLength=function(){return vt.getBitsLength(this.data.length)},vt.prototype.write=function(e){let t;for(t=0;t<this.data.length;t++){let i=yt.toSJIS(this.data[t]);if(i>=33088&&i<=40956)i-=33088;else{if(!(i>=57408&&i<=60351))throw new Error("Invalid SJIS character: "+this.data[t]+"\nMake sure your charset is UTF-8");i-=49472}i=192*(i>>>8&255)+(255&i),e.put(i,13)}};var xt=vt;!function(e){const t=Ye,i=ct,n=pt,o=mt,r=xt,s=Ge,a=Ce,l=D;function c(e){return unescape(encodeURIComponent(e)).length}function d(e,t,i){const n=[];let o;for(;null!==(o=e.exec(i));)n.push({data:o[0],index:o.index,mode:t,length:o[0].length});return n}function u(e){const i=d(s.NUMERIC,t.NUMERIC,e),n=d(s.ALPHANUMERIC,t.ALPHANUMERIC,e);let o,r;a.isKanjiModeEnabled()?(o=d(s.BYTE,t.BYTE,e),r=d(s.KANJI,t.KANJI,e)):(o=d(s.BYTE_KANJI,t.BYTE,e),r=[]);return i.concat(n,o,r).sort(function(e,t){return e.index-t.index}).map(function(e){return{data:e.data,mode:e.mode,length:e.length}})}function h(e,s){switch(s){case t.NUMERIC:return i.getBitsLength(e);case t.ALPHANUMERIC:return n.getBitsLength(e);case t.KANJI:return r.getBitsLength(e);case t.BYTE:return o.getBitsLength(e)}}function p(e,s){let l;const c=t.getBestModeForData(e);if(l=t.from(s,c),l!==t.BYTE&&l.bit<c.bit)throw new Error('"'+e+'" cannot be encoded with mode '+t.toString(l)+".\n Suggested mode is: "+t.toString(c));switch(l!==t.KANJI||a.isKanjiModeEnabled()||(l=t.BYTE),l){case t.NUMERIC:return new i(e);case t.ALPHANUMERIC:return new n(e);case t.KANJI:return new r(e);case t.BYTE:return new o(e)}}e.fromArray=function(e){return e.reduce(function(e,t){return"string"==typeof t?e.push(p(t,null)):t.data&&e.push(p(t.data,t.mode)),e},[])},e.fromString=function(i,n){const o=function(e){const i=[];for(let n=0;n<e.length;n++){const o=e[n];switch(o.mode){case t.NUMERIC:i.push([o,{data:o.data,mode:t.ALPHANUMERIC,length:o.length},{data:o.data,mode:t.BYTE,length:o.length}]);break;case t.ALPHANUMERIC:i.push([o,{data:o.data,mode:t.BYTE,length:o.length}]);break;case t.KANJI:i.push([o,{data:o.data,mode:t.BYTE,length:c(o.data)}]);break;case t.BYTE:i.push([{data:o.data,mode:t.BYTE,length:c(o.data)}])}}return i}(u(i,a.isKanjiModeEnabled())),r=function(e,i){const n={},o={start:{}};let r=["start"];for(let s=0;s<e.length;s++){const a=e[s],l=[];for(let e=0;e<a.length;e++){const c=a[e],d=""+s+e;l.push(d),n[d]={node:c,lastCount:0},o[d]={};for(let e=0;e<r.length;e++){const s=r[e];n[s]&&n[s].node.mode===c.mode?(o[s][d]=h(n[s].lastCount+c.length,c.mode)-h(n[s].lastCount,c.mode),n[s].lastCount+=c.length):(n[s]&&(n[s].lastCount=c.length),o[s][d]=h(c.length,c.mode)+4+t.getCharCountIndicator(c.mode,i))}}r=l}for(let t=0;t<r.length;t++)o[r[t]].end=0;return{map:o,table:n}}(o,n),s=l.find_path(r.map,"start","end"),d=[];for(let e=1;e<s.length-1;e++)d.push(r.table[s[e]].node);return e.fromArray(function(e){return e.reduce(function(e,t){const i=e.length-1>=0?e[e.length-1]:null;return i&&i.mode===t.mode?(e[e.length-1].data+=t.data,e):(e.push(t),e)},[])}(d))},e.rawSplit=function(t){return e.fromArray(u(t,a.isKanjiModeEnabled()))}}(st);const $t=Ce,Ct=Te,kt=Se,Et=Ae,Rt=Le,Tt=Be,It=je,St=Ne,Pt=He,At=Ke,Lt=nt,Bt=Ye,Ot=st;function jt(e,t,i){const n=e.size,o=Lt.getEncodedBits(t,i);let r,s;for(r=0;r<15;r++)s=1==(o>>r&1),r<6?e.set(r,8,s,!0):r<8?e.set(r+1,8,s,!0):e.set(n-15+r,8,s,!0),r<8?e.set(8,n-r-1,s,!0):r<9?e.set(8,15-r-1+1,s,!0):e.set(8,15-r-1,s,!0);e.set(n-8,8,1,!0)}function Nt(e,t,i){const n=new kt;i.forEach(function(t){n.put(t.mode.bit,4),n.put(t.getLength(),Bt.getCharCountIndicator(t.mode,e)),t.write(n)});const o=8*($t.getSymbolTotalCodewords(e)-St.getTotalCodewordsCount(e,t));for(n.getLengthInBits()+4<=o&&n.put(0,4);n.getLengthInBits()%8!=0;)n.putBit(0);const r=(o-n.getLengthInBits())/8;for(let s=0;s<r;s++)n.put(s%2?17:236,8);return function(e,t,i){const n=$t.getSymbolTotalCodewords(t),o=St.getTotalCodewordsCount(t,i),r=n-o,s=St.getBlocksCount(t,i),a=n%s,l=s-a,c=Math.floor(n/s),d=Math.floor(r/s),u=d+1,h=c-d,p=new Pt(h);let g=0;const f=new Array(s),w=new Array(s);let m=0;const b=new Uint8Array(e.buffer);for(let C=0;C<s;C++){const e=C<l?d:u;f[C]=b.slice(g,g+e),w[C]=p.encode(f[C]),g+=e,m=Math.max(m,e)}const y=new Uint8Array(n);let v,x,$=0;for(v=0;v<m;v++)for(x=0;x<s;x++)v<f[x].length&&(y[$++]=f[x][v]);for(v=0;v<h;v++)for(x=0;x<s;x++)y[$++]=w[x][v];return y}(n,e,t)}function Mt(e,t,i,n){let o;if(Array.isArray(e))o=Ot.fromArray(e);else{if("string"!=typeof e)throw new Error("Invalid data");{let n=t;if(!n){const t=Ot.rawSplit(e);n=At.getBestVersionForData(t,i)}o=Ot.fromString(e,n||40)}}const r=At.getBestVersionForData(o,i);if(!r)throw new Error("The amount of data is too big to be stored in a QR Code");if(t){if(t<r)throw new Error("\nThe chosen QR Code version cannot contain this amount of data.\nMinimum version required to store current data is: "+r+".\n")}else t=r;const s=Nt(t,i,o),a=$t.getSymbolSize(t),l=new Et(a);return function(e,t){const i=e.size,n=Tt.getPositions(t);for(let o=0;o<n.length;o++){const t=n[o][0],r=n[o][1];for(let n=-1;n<=7;n++)if(!(t+n<=-1||i<=t+n))for(let o=-1;o<=7;o++)r+o<=-1||i<=r+o||(n>=0&&n<=6&&(0===o||6===o)||o>=0&&o<=6&&(0===n||6===n)||n>=2&&n<=4&&o>=2&&o<=4?e.set(t+n,r+o,!0,!0):e.set(t+n,r+o,!1,!0))}}(l,t),function(e){const t=e.size;for(let i=8;i<t-8;i++){const t=i%2==0;e.set(i,6,t,!0),e.set(6,i,t,!0)}}(l),function(e,t){const i=Rt.getPositions(t);for(let n=0;n<i.length;n++){const t=i[n][0],o=i[n][1];for(let i=-2;i<=2;i++)for(let n=-2;n<=2;n++)-2===i||2===i||-2===n||2===n||0===i&&0===n?e.set(t+i,o+n,!0,!0):e.set(t+i,o+n,!1,!0)}}(l,t),jt(l,i,0),t>=7&&function(e,t){const i=e.size,n=At.getEncodedBits(t);let o,r,s;for(let a=0;a<18;a++)o=Math.floor(a/3),r=a%3+i-8-3,s=1==(n>>a&1),e.set(o,r,s,!0),e.set(r,o,s,!0)}(l,t),function(e,t){const i=e.size;let n=-1,o=i-1,r=7,s=0;for(let a=i-1;a>0;a-=2)for(6===a&&a--;;){for(let i=0;i<2;i++)if(!e.isReserved(o,a-i)){let n=!1;s<t.length&&(n=1==(t[s]>>>r&1)),e.set(o,a-i,n),r--,-1===r&&(s++,r=7)}if(o+=n,o<0||i<=o){o-=n,n=-n;break}}}(l,s),isNaN(n)&&(n=It.getBestMask(l,jt.bind(null,l,i))),It.applyMask(n,l),jt(l,i,n),{modules:l,version:t,errorCorrectionLevel:i,maskPattern:n,segments:o}}$e.create=function(e,t){if(void 0===e||""===e)throw new Error("No input text");let i,n,o=Ct.M;return void 0!==t&&(o=Ct.from(t.errorCorrectionLevel,Ct.M),i=At.from(t.version),n=It.from(t.maskPattern),t.toSJISFunc&&$t.setToSJISFunction(t.toSJISFunc)),Mt(e,i,o,n)};var Wt={},zt={};!function(e){function t(e){if("number"==typeof e&&(e=e.toString()),"string"!=typeof e)throw new Error("Color should be defined as hex string");let t=e.slice().replace("#","").split("");if(t.length<3||5===t.length||t.length>8)throw new Error("Invalid hex color: "+e);3!==t.length&&4!==t.length||(t=Array.prototype.concat.apply([],t.map(function(e){return[e,e]}))),6===t.length&&t.push("F","F");const i=parseInt(t.join(""),16);return{r:i>>24&255,g:i>>16&255,b:i>>8&255,a:255&i,hex:"#"+t.slice(0,6).join("")}}e.getOptions=function(e){e||(e={}),e.color||(e.color={});const i=void 0===e.margin||null===e.margin||e.margin<0?4:e.margin,n=e.width&&e.width>=21?e.width:void 0,o=e.scale||4;return{width:n,scale:n?4:o,margin:i,color:{dark:t(e.color.dark||"#000000ff"),light:t(e.color.light||"#ffffffff")},type:e.type,rendererOpts:e.rendererOpts||{}}},e.getScale=function(e,t){return t.width&&t.width>=e+2*t.margin?t.width/(e+2*t.margin):t.scale},e.getImageWidth=function(t,i){const n=e.getScale(t,i);return Math.floor((t+2*i.margin)*n)},e.qrToImageData=function(t,i,n){const o=i.modules.size,r=i.modules.data,s=e.getScale(o,n),a=Math.floor((o+2*n.margin)*s),l=n.margin*s,c=[n.color.light,n.color.dark];for(let e=0;e<a;e++)for(let i=0;i<a;i++){let d=4*(e*a+i),u=n.color.light;if(e>=l&&i>=l&&e<a-l&&i<a-l){u=c[r[Math.floor((e-l)/s)*o+Math.floor((i-l)/s)]?1:0]}t[d++]=u.r,t[d++]=u.g,t[d++]=u.b,t[d]=u.a}}}(zt),function(e){const t=zt;e.render=function(e,i,n){let o=n,r=i;void 0!==o||i&&i.getContext||(o=i,i=void 0),i||(r=function(){try{return document.createElement("canvas")}catch(yi){throw new Error("You need to specify a canvas element")}}()),o=t.getOptions(o);const s=t.getImageWidth(e.modules.size,o),a=r.getContext("2d"),l=a.createImageData(s,s);return t.qrToImageData(l.data,e,o),function(e,t,i){e.clearRect(0,0,t.width,t.height),t.style||(t.style={}),t.height=i,t.width=i,t.style.height=i+"px",t.style.width=i+"px"}(a,r,s),a.putImageData(l,0,0),r},e.renderToDataURL=function(t,i,n){let o=n;void 0!==o||i&&i.getContext||(o=i,i=void 0),o||(o={});const r=e.render(t,i,o),s=o.type||"image/png",a=o.rendererOpts||{};return r.toDataURL(s,a.quality)}}(Wt);var _t={};const Dt=zt;function Ut(e,t){const i=e.a/255,n=t+'="'+e.hex+'"';return i<1?n+" "+t+'-opacity="'+i.toFixed(2).slice(1)+'"':n}function Ft(e,t,i){let n=e+t;return void 0!==i&&(n+=" "+i),n}_t.render=function(e,t,i){const n=Dt.getOptions(t),o=e.modules.size,r=e.modules.data,s=o+2*n.margin,a=n.color.light.a?"<path "+Ut(n.color.light,"fill")+' d="M0 0h'+s+"v"+s+'H0z"/>':"",l="<path "+Ut(n.color.dark,"stroke")+' d="'+function(e,t,i){let n="",o=0,r=!1,s=0;for(let a=0;a<e.length;a++){const l=Math.floor(a%t),c=Math.floor(a/t);l||r||(r=!0),e[a]?(s++,a>0&&l>0&&e[a-1]||(n+=r?Ft("M",l+i,.5+c+i):Ft("m",o,0),o=0,r=!1),l+1<t&&e[a+1]||(n+=Ft("h",s),s=0)):o++}return n}(r,o,n.margin)+'"/>',c='viewBox="0 0 '+s+" "+s+'"',d='<svg xmlns="http://www.w3.org/2000/svg" '+(n.width?'width="'+n.width+'" height="'+n.width+'" ':"")+c+' shape-rendering="crispEdges">'+a+l+"</svg>\n";return"function"==typeof i&&i(null,d),d};const Vt=function(){return"function"==typeof Promise&&Promise.prototype&&Promise.prototype.then},qt=$e,Ht=Wt,Kt=_t;function Yt(e,t,i,n,o){const r=[].slice.call(arguments,1),s=r.length,a="function"==typeof r[s-1];if(!a&&!Vt())throw new Error("Callback required as last argument");if(!a){if(s<1)throw new Error("Too few arguments provided");return 1===s?(i=t,t=n=void 0):2!==s||t.getContext||(n=i,i=t,t=void 0),new Promise(function(o,r){try{const r=qt.create(i,n);o(e(r,t,n))}catch(yi){r(yi)}})}if(s<2)throw new Error("Too few arguments provided");2===s?(o=i,i=t,t=n=void 0):3===s&&(t.getContext&&void 0===o?(o=n,n=void 0):(o=n,n=i,i=t,t=void 0));try{const r=qt.create(i,n);o(null,e(r,t,n))}catch(yi){o(yi)}}xe.create=qt.create,xe.toCanvas=Yt.bind(null,Ht.render),xe.toDataURL=Yt.bind(null,Ht.renderToDataURL),xe.toString=Yt.bind(null,function(e,t,i){return Kt.render(e,i)});function Jt(e,t,i){if(e===t)return!1;return(e-t<0?t-e:e-t)<=i+.1}const Gt={generate({uri:e,size:t,logoSize:i,padding:n=8,dotColor:o="var(--apkt-colors-black)"}){const r=10,s=[],a=function(e,t){const i=Array.prototype.slice.call(xe.create(e,{errorCorrectionLevel:t}).modules.data,0),n=Math.sqrt(i.length);return i.reduce((e,t,i)=>(i%n===0?e.push([t]):e[e.length-1].push(t))&&e,[])}(e,"Q"),l=(t-2*n)/a.length,c=[{x:0,y:0},{x:1,y:0},{x:0,y:1}];c.forEach(({x:e,y:t})=>{const i=(a.length-7)*l*e+n,d=(a.length-7)*l*t+n,u=.45;for(let n=0;n<c.length;n+=1){const e=l*(7-2*n);s.push(E`
            <rect
              fill=${2===n?"var(--apkt-colors-black)":"var(--apkt-colors-white)"}
              width=${0===n?e-r:e}
              rx= ${0===n?(e-r)*u:e*u}
              ry= ${0===n?(e-r)*u:e*u}
              stroke=${o}
              stroke-width=${0===n?r:0}
              height=${0===n?e-r:e}
              x= ${0===n?d+l*n+5:d+l*n}
              y= ${0===n?i+l*n+5:i+l*n}
            />
          `)}});const d=Math.floor((i+25)/l),u=a.length/2-d/2,h=a.length/2+d/2-1,p=[];a.forEach((e,t)=>{e.forEach((e,i)=>{if(a[t][i]&&!(t<7&&i<7||t>a.length-8&&i<7||t<7&&i>a.length-8||t>u&&t<h&&i>u&&i<h)){const e=t*l+l/2+n,o=i*l+l/2+n;p.push([e,o])}})});const g={};return p.forEach(([e,t])=>{g[e]?g[e]?.push(t):g[e]=[t]}),Object.entries(g).map(([e,t])=>{const i=t.filter(e=>t.every(t=>!Jt(e,t,l)));return[Number(e),i]}).forEach(([e,t])=>{t.forEach(t=>{s.push(E`<circle cx=${e} cy=${t} fill=${o} r=${l/2.5} />`)})}),Object.entries(g).filter(([e,t])=>t.length>1).map(([e,t])=>{const i=t.filter(e=>t.some(t=>Jt(e,t,l)));return[Number(e),i]}).map(([e,t])=>{t.sort((e,t)=>e<t?-1:1);const i=[];for(const n of t){const e=i.find(e=>e.some(e=>Jt(n,e,l)));e?e.push(n):i.push([n])}return[e,i.map(e=>[e[0],e[e.length-1]])]}).forEach(([e,t])=>{t.forEach(([t,i])=>{s.push(E`
              <line
                x1=${e}
                x2=${e}
                y1=${t}
                y2=${i}
                stroke=${o}
                stroke-width=${l/1.25}
                stroke-linecap="round"
              />
            `)})}),s}},Qt=d`
  :host {
    position: relative;
    user-select: none;
    display: block;
    overflow: hidden;
    aspect-ratio: 1 / 1;
    width: 100%;
    height: 100%;
    background-color: ${({colors:e})=>e.white};
    border: 1px solid ${({tokens:e})=>e.theme.borderPrimary};
  }

  :host {
    border-radius: ${({borderRadius:e})=>e[4]};
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :host([data-clear='true']) > wui-icon {
    display: none;
  }

  svg:first-child,
  wui-image,
  wui-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    background-color: ${({tokens:e})=>e.theme.backgroundPrimary};
    box-shadow: inset 0 0 0 4px ${({tokens:e})=>e.theme.backgroundPrimary};
    border-radius: ${({borderRadius:e})=>e[6]};
  }

  wui-image {
    width: 25%;
    height: 25%;
    border-radius: ${({borderRadius:e})=>e[2]};
  }

  wui-icon {
    width: 100%;
    height: 100%;
    color: #3396ff !important;
    transform: translateY(-50%) translateX(-50%) scale(0.25);
  }

  wui-icon > svg {
    width: inherit;
    height: inherit;
  }
`;var Xt=function(e,t,i,n){var o,r=arguments.length,s=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,n);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r<3?o(s):r>3?o(t,i,s):o(t,i))||s);return r>3&&s&&Object.defineProperty(t,i,s),s};let Zt=class extends e{constructor(){super(...arguments),this.uri="",this.size=500,this.theme="dark",this.imageSrc=void 0,this.alt=void 0,this.arenaClear=void 0,this.farcaster=void 0}render(){return this.dataset.theme=this.theme,this.dataset.clear=String(this.arenaClear),a`<wui-flex
      alignItems="center"
      justifyContent="center"
      class="wui-qr-code"
      direction="column"
      gap="4"
      width="100%"
      style="height: 100%"
    >
      ${this.templateVisual()} ${this.templateSvg()}
    </wui-flex>`}templateSvg(){return E`
      <svg viewBox="0 0 ${this.size} ${this.size}" width="100%" height="100%">
        ${Gt.generate({uri:this.uri,size:this.size,logoSize:this.arenaClear?0:this.size/4})}
      </svg>
    `}templateVisual(){return this.imageSrc?a`<wui-image src=${this.imageSrc} alt=${this.alt??"logo"}></wui-image>`:this.farcaster?a`<wui-icon
        class="farcaster"
        size="inherit"
        color="inherit"
        name="farcaster"
      ></wui-icon>`:a`<wui-icon size="inherit" color="inherit" name="walletConnect"></wui-icon>`}};Zt.styles=[w,Qt],Xt([A()],Zt.prototype,"uri",void 0),Xt([A({type:Number})],Zt.prototype,"size",void 0),Xt([A()],Zt.prototype,"theme",void 0),Xt([A()],Zt.prototype,"imageSrc",void 0),Xt([A()],Zt.prototype,"alt",void 0),Xt([A({type:Boolean})],Zt.prototype,"arenaClear",void 0),Xt([A({type:Boolean})],Zt.prototype,"farcaster",void 0),Zt=Xt([B("wui-qr-code")],Zt);const ei=d`
  wui-shimmer {
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: ${({borderRadius:e})=>e[4]};
  }

  wui-qr-code {
    opacity: 0;
    animation-duration: ${({durations:e})=>e.xl};
    animation-timing-function: ${({easings:e})=>e["ease-out-power-2"]};
    animation-name: fade-in;
    animation-fill-mode: forwards;
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;var ti=function(e,t,i,n){var o,r=arguments.length,s=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,n);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r<3?o(s):r>3?o(t,i,s):o(t,i))||s);return r>3&&s&&Object.defineProperty(t,i,s),s};let ii=class extends ge{constructor(){super(),this.basic=!1}firstUpdated(){this.basic||l.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet?.name??"WalletConnect",platform:"qrcode",displayIndex:this.wallet?.display_index,walletRank:this.wallet?.order,view:c.state.view}})}disconnectedCallback(){super.disconnectedCallback(),this.unsubscribe?.forEach(e=>e())}render(){return this.onRenderProxy(),a`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["0","5","5","5"]}
        gap="5"
      >
        <wui-shimmer width="100%"> ${this.qrCodeTemplate()} </wui-shimmer>
        <wui-text variant="lg-medium" color="primary"> Scan this QR Code with your phone </wui-text>
        ${this.copyTemplate()}
      </wui-flex>
      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `}onRenderProxy(){!this.ready&&this.uri&&(this.ready=!0)}qrCodeTemplate(){if(!this.uri||!this.ready)return null;const e=this.wallet?this.wallet.name:void 0;r.setWcLinking(void 0),r.setRecentWallet(this.wallet);const t=b.state.themeVariables["--apkt-qr-color"]??b.state.themeVariables["--w3m-qr-color"];return a` <wui-qr-code
      theme=${b.state.themeMode}
      uri=${this.uri}
      imageSrc=${O(p.getWalletImage(this.wallet))}
      color=${O(t)}
      alt=${O(e)}
      data-testid="wui-qr-code"
    ></wui-qr-code>`}copyTemplate(){const e=!this.uri||!this.ready;return a`<wui-button
      .disabled=${e}
      @click=${this.onCopyUri}
      variant="neutral-secondary"
      size="sm"
      data-testid="copy-wc2-uri"
    >
      Copy link
      <wui-icon size="sm" color="inherit" name="copy" slot="iconRight"></wui-icon>
    </wui-button>`}};ii.styles=ei,ti([A({type:Boolean})],ii.prototype,"basic",void 0),ii=ti([B("w3m-connecting-wc-qrcode")],ii);var ni=function(e,t,i,n){var o,r=arguments.length,s=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,n);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r<3?o(s):r>3?o(t,i,s):o(t,i))||s);return r>3&&s&&Object.defineProperty(t,i,s),s};let oi=class extends e{constructor(){if(super(),this.wallet=c.state.data?.wallet,!this.wallet)throw new Error("w3m-connecting-wc-unsupported: No wallet provided");l.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"browser",displayIndex:this.wallet?.display_index,walletRank:this.wallet?.order,view:c.state.view}})}render(){return a`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["10","5","5","5"]}
        gap="5"
      >
        <wui-wallet-image
          size="lg"
          imageSrc=${O(p.getWalletImage(this.wallet))}
        ></wui-wallet-image>

        <wui-text variant="md-regular" color="primary">Not Detected</wui-text>
      </wui-flex>

      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `}};oi=ni([B("w3m-connecting-wc-unsupported")],oi);var ri=function(e,t,i,n){var o,r=arguments.length,s=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,n);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r<3?o(s):r>3?o(t,i,s):o(t,i))||s);return r>3&&s&&Object.defineProperty(t,i,s),s};let si=class extends ge{constructor(){if(super(),this.isLoading=!0,!this.wallet)throw new Error("w3m-connecting-wc-web: No wallet provided");this.onConnect=this.onConnectProxy.bind(this),this.secondaryBtnLabel="Open",this.secondaryLabel=k.CONNECT_LABELS.MOBILE,this.secondaryBtnIcon="externalLink",this.updateLoadingState(),this.unsubscribe.push(r.subscribeKey("wcUri",()=>{this.updateLoadingState()})),l.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"web",displayIndex:this.wallet?.display_index,walletRank:this.wallet?.order,view:c.state.view}})}updateLoadingState(){this.isLoading=!this.uri}onConnectProxy(){if(this.wallet?.webapp_link&&this.uri)try{this.error=!1;const{webapp_link:e,name:t}=this.wallet,{redirect:i,href:n}=o.formatUniversalUrl(e,this.uri);r.setWcLinking({name:t,href:n}),r.setRecentWallet(this.wallet),o.openHref(i,"_blank")}catch{this.error=!0}}};ri([L()],si.prototype,"isLoading",void 0),si=ri([B("w3m-connecting-wc-web")],si);const ai=d`
  :host([data-mobile-fullscreen='true']) {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  :host([data-mobile-fullscreen='true']) wui-ux-by-reown {
    margin-top: auto;
  }
`;var li=function(e,t,i,n){var o,r=arguments.length,s=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,n);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r<3?o(s):r>3?o(t,i,s):o(t,i))||s);return r>3&&s&&Object.defineProperty(t,i,s),s};let ci=class extends e{constructor(){super(),this.wallet=c.state.data?.wallet,this.unsubscribe=[],this.platform=void 0,this.platforms=[],this.isSiwxEnabled=Boolean(n.state.siwx),this.remoteFeatures=n.state.remoteFeatures,this.displayBranding=!0,this.basic=!1,this.determinePlatforms(),this.initializeConnection(),this.unsubscribe.push(n.subscribeKey("remoteFeatures",e=>this.remoteFeatures=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return n.state.enableMobileFullScreen&&this.setAttribute("data-mobile-fullscreen","true"),a`
      ${this.headerTemplate()}
      <div class="platform-container">${this.platformTemplate()}</div>
      ${this.reownBrandingTemplate()}
    `}reownBrandingTemplate(){return this.remoteFeatures?.reownBranding&&this.displayBranding?a`<wui-ux-by-reown></wui-ux-by-reown>`:null}async initializeConnection(e=!1){if("browser"!==this.platform&&(!n.state.manualWCControl||e))try{const{wcPairingExpiry:t,status:i}=r.state,{redirectView:s}=c.state.data??{};if(e||n.state.enableEmbedded||o.isPairingExpired(t)||"connecting"===i){const e=r.getConnections(f.state.activeChain),t=this.remoteFeatures?.multiWallet,i=e.length>0;await r.connectWalletConnect({cache:"never"}),this.isSiwxEnabled||(i&&t?(c.replace("ProfileWallets"),y.showSuccess("New Wallet Added")):s?c.replace(s):v.close())}}catch(t){if(t instanceof Error&&t.message.includes("An error occurred when attempting to switch chain")&&!n.state.enableNetworkSwitch&&f.state.activeChain)return f.setActiveCaipNetwork(R.getUnsupportedNetwork(`${f.state.activeChain}:${f.state.activeCaipNetwork?.id}`)),void f.showUnsupportedChainUI();t instanceof x&&t.originalName===$.PROVIDER_RPC_ERROR_NAME.USER_REJECTED_REQUEST?l.sendEvent({type:"track",event:"USER_REJECTED",properties:{message:t.message}}):l.sendEvent({type:"track",event:"CONNECT_ERROR",properties:{message:t?.message??"Unknown"}}),r.setWcError(!0),y.showError(t.message??"Connection error"),r.resetWcConnection(),c.goBack()}}determinePlatforms(){if(!this.wallet)return this.platforms.push("qrcode"),void(this.platform="qrcode");if(this.platform)return;const{mobile_link:e,desktop_link:t,webapp_link:i,injected:s,rdns:a}=this.wallet,l=s?.map(({injected_id:e})=>e).filter(Boolean),c=[...a?[a]:l??[]],d=!n.state.isUniversalProvider&&c.length,u=e,h=i,p=r.checkInstalled(c),g=d&&p,w=t&&!o.isMobile();g&&!f.state.noAdapters&&this.platforms.push("browser"),u&&this.platforms.push(o.isMobile()?"mobile":"qrcode"),h&&this.platforms.push("web"),w&&this.platforms.push("desktop"),g||!d||f.state.noAdapters||this.platforms.push("unsupported"),this.platform=this.platforms[0]}platformTemplate(){switch(this.platform){case"browser":return a`<w3m-connecting-wc-browser></w3m-connecting-wc-browser>`;case"web":return a`<w3m-connecting-wc-web></w3m-connecting-wc-web>`;case"desktop":return a`
          <w3m-connecting-wc-desktop .onRetry=${()=>this.initializeConnection(!0)}>
          </w3m-connecting-wc-desktop>
        `;case"mobile":return a`
          <w3m-connecting-wc-mobile isMobile .onRetry=${()=>this.initializeConnection(!0)}>
          </w3m-connecting-wc-mobile>
        `;case"qrcode":return a`<w3m-connecting-wc-qrcode ?basic=${this.basic}></w3m-connecting-wc-qrcode>`;default:return a`<w3m-connecting-wc-unsupported></w3m-connecting-wc-unsupported>`}}headerTemplate(){return this.platforms.length>1?a`
      <w3m-connecting-header
        .platforms=${this.platforms}
        .onSelectPlatfrom=${this.onSelectPlatform.bind(this)}
      >
      </w3m-connecting-header>
    `:null}async onSelectPlatform(e){const t=this.shadowRoot?.querySelector("div");t&&(await t.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.platform=e,t.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"}))}};ci.styles=ai,li([L()],ci.prototype,"platform",void 0),li([L()],ci.prototype,"platforms",void 0),li([L()],ci.prototype,"isSiwxEnabled",void 0),li([L()],ci.prototype,"remoteFeatures",void 0),li([A({type:Boolean})],ci.prototype,"displayBranding",void 0),li([A({type:Boolean})],ci.prototype,"basic",void 0),ci=li([B("w3m-connecting-wc-view")],ci);var di=function(e,t,i,n){var o,r=arguments.length,s=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,n);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r<3?o(s):r>3?o(t,i,s):o(t,i))||s);return r>3&&s&&Object.defineProperty(t,i,s),s};let ui=class extends e{constructor(){super(),this.unsubscribe=[],this.isMobile=o.isMobile(),this.remoteFeatures=n.state.remoteFeatures,this.unsubscribe.push(n.subscribeKey("remoteFeatures",e=>this.remoteFeatures=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){if(this.isMobile){const{featured:e,recommended:t}=i.state,{customWallets:o}=n.state,r=T.getRecentWallets(),s=e.length||t.length||o?.length||r.length;return a`<wui-flex flexDirection="column" gap="2" .margin=${["1","3","3","3"]}>
        ${s?a`<w3m-connector-list></w3m-connector-list>`:null}
        <w3m-all-wallets-widget></w3m-all-wallets-widget>
      </wui-flex>`}return a`<wui-flex flexDirection="column" .padding=${["0","0","4","0"]}>
        <w3m-connecting-wc-view ?basic=${!0} .displayBranding=${!1}></w3m-connecting-wc-view>
        <wui-flex flexDirection="column" .padding=${["0","3","0","3"]}>
          <w3m-all-wallets-widget></w3m-all-wallets-widget>
        </wui-flex>
      </wui-flex>
      ${this.reownBrandingTemplate()} `}reownBrandingTemplate(){return this.remoteFeatures?.reownBranding?a` <wui-flex flexDirection="column" .padding=${["1","0","1","0"]}>
      <wui-ux-by-reown></wui-ux-by-reown>
    </wui-flex>`:null}};di([L()],ui.prototype,"isMobile",void 0),di([L()],ui.prototype,"remoteFeatures",void 0),ui=di([B("w3m-connecting-wc-basic-view")],ui);
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const hi=(e,t)=>{const i=e._$AN;if(void 0===i)return!1;for(const n of i)n._$AO?.(t,!1),hi(n,t);return!0},pi=e=>{let t,i;do{if(void 0===(t=e._$AM))break;i=t._$AN,i.delete(e),e=t}while(0===i?.size)},gi=e=>{for(let t;t=e._$AM;e=t){let i=t._$AN;if(void 0===i)t._$AN=i=new Set;else if(i.has(e))break;i.add(e),mi(t)}};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function fi(e){void 0!==this._$AN?(pi(this),this._$AM=e,gi(this)):this._$AM=e}function wi(e,t=!1,i=0){const n=this._$AH,o=this._$AN;if(void 0!==o&&0!==o.size)if(t)if(Array.isArray(n))for(let r=i;r<n.length;r++)hi(n[r],!1),pi(n[r]);else null!=n&&(hi(n,!1),pi(n));else hi(this,e)}const mi=e=>{e.type==M.CHILD&&(e._$AP??=wi,e._$AQ??=fi)};class bi extends N{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,t,i){super._$AT(e,t,i),gi(this),this.isConnected=e._$AU}_$AO(e,t=!0){e!==this.isConnected&&(this.isConnected=e,e?this.reconnected?.():this.disconnected?.()),t&&(hi(this,e),pi(this))}setValue(e){if((e=>void 0===e.strings)(this._$Ct))this._$Ct._$AI(e,this);else{const t=[...this._$Ct._$AH];t[this._$Ci]=e,this._$Ct._$AI(t,this,0)}}disconnected(){}reconnected(){}}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const yi=()=>new vi;class vi{}const xi=new WeakMap,$i=W(class extends bi{render(e){return I}update(e,[t]){const i=t!==this.G;return i&&void 0!==this.G&&this.rt(void 0),(i||this.lt!==this.ct)&&(this.G=t,this.ht=e.options?.host,this.rt(this.ct=e.element)),I}rt(e){if(this.isConnected||(e=void 0),"function"==typeof this.G){const t=this.ht??globalThis;let i=xi.get(t);void 0===i&&(i=new WeakMap,xi.set(t,i)),void 0!==i.get(this.G)&&this.G.call(this.ht,void 0),i.set(this.G,e),void 0!==e&&this.G.call(this.ht,e)}else this.G.value=e}get lt(){return"function"==typeof this.G?xi.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}}),Ci=d`
  :host {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  label {
    position: relative;
    display: inline-block;
    user-select: none;
    transition:
      background-color ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-2"]},
      color ${({durations:e})=>e.lg} ${({easings:e})=>e["ease-out-power-2"]},
      border ${({durations:e})=>e.lg} ${({easings:e})=>e["ease-out-power-2"]},
      box-shadow ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-2"]},
      width ${({durations:e})=>e.lg} ${({easings:e})=>e["ease-out-power-2"]},
      height ${({durations:e})=>e.lg} ${({easings:e})=>e["ease-out-power-2"]},
      transform ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-2"]},
      opacity ${({durations:e})=>e.lg} ${({easings:e})=>e["ease-out-power-2"]};
    will-change: background-color, color, border, box-shadow, width, height, transform, opacity;
  }

  input {
    width: 0;
    height: 0;
    opacity: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${({colors:e})=>e.neutrals300};
    border-radius: ${({borderRadius:e})=>e.round};
    border: 1px solid transparent;
    will-change: border;
    transition:
      background-color ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-2"]},
      color ${({durations:e})=>e.lg} ${({easings:e})=>e["ease-out-power-2"]},
      border ${({durations:e})=>e.lg} ${({easings:e})=>e["ease-out-power-2"]},
      box-shadow ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-2"]},
      width ${({durations:e})=>e.lg} ${({easings:e})=>e["ease-out-power-2"]},
      height ${({durations:e})=>e.lg} ${({easings:e})=>e["ease-out-power-2"]},
      transform ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-2"]},
      opacity ${({durations:e})=>e.lg} ${({easings:e})=>e["ease-out-power-2"]};
    will-change: background-color, color, border, box-shadow, width, height, transform, opacity;
  }

  span:before {
    content: '';
    position: absolute;
    background-color: ${({colors:e})=>e.white};
    border-radius: 50%;
  }

  /* -- Sizes --------------------------------------------------------- */
  label[data-size='lg'] {
    width: 48px;
    height: 32px;
  }

  label[data-size='md'] {
    width: 40px;
    height: 28px;
  }

  label[data-size='sm'] {
    width: 32px;
    height: 22px;
  }

  label[data-size='lg'] > span:before {
    height: 24px;
    width: 24px;
    left: 4px;
    top: 3px;
  }

  label[data-size='md'] > span:before {
    height: 20px;
    width: 20px;
    left: 4px;
    top: 3px;
  }

  label[data-size='sm'] > span:before {
    height: 16px;
    width: 16px;
    left: 3px;
    top: 2px;
  }

  /* -- Focus states --------------------------------------------------- */
  input:focus-visible:not(:checked) + span,
  input:focus:not(:checked) + span {
    border: 1px solid ${({tokens:e})=>e.core.iconAccentPrimary};
    background-color: ${({tokens:e})=>e.theme.textTertiary};
    box-shadow: 0px 0px 0px 4px rgba(9, 136, 240, 0.2);
  }

  input:focus-visible:checked + span,
  input:focus:checked + span {
    border: 1px solid ${({tokens:e})=>e.core.iconAccentPrimary};
    box-shadow: 0px 0px 0px 4px rgba(9, 136, 240, 0.2);
  }

  /* -- Checked states --------------------------------------------------- */
  input:checked + span {
    background-color: ${({tokens:e})=>e.core.iconAccentPrimary};
  }

  label[data-size='lg'] > input:checked + span:before {
    transform: translateX(calc(100% - 9px));
  }

  label[data-size='md'] > input:checked + span:before {
    transform: translateX(calc(100% - 9px));
  }

  label[data-size='sm'] > input:checked + span:before {
    transform: translateX(calc(100% - 7px));
  }

  /* -- Hover states ------------------------------------------------------- */
  label:hover > input:not(:checked):not(:disabled) + span {
    background-color: ${({colors:e})=>e.neutrals400};
  }

  label:hover > input:checked:not(:disabled) + span {
    background-color: ${({colors:e})=>e.accent080};
  }

  /* -- Disabled state --------------------------------------------------- */
  label:has(input:disabled) {
    pointer-events: none;
    user-select: none;
  }

  input:not(:checked):disabled + span {
    background-color: ${({colors:e})=>e.neutrals700};
  }

  input:checked:disabled + span {
    background-color: ${({colors:e})=>e.neutrals700};
  }

  input:not(:checked):disabled + span::before {
    background-color: ${({colors:e})=>e.neutrals400};
  }

  input:checked:disabled + span::before {
    background-color: ${({tokens:e})=>e.theme.textTertiary};
  }
`;var ki=function(e,t,i,n){var o,r=arguments.length,s=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,n);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r<3?o(s):r>3?o(t,i,s):o(t,i))||s);return r>3&&s&&Object.defineProperty(t,i,s),s};let Ei=class extends e{constructor(){super(...arguments),this.inputElementRef=yi(),this.checked=!1,this.disabled=!1,this.size="md"}render(){return a`
      <label data-size=${this.size}>
        <input
          ${$i(this.inputElementRef)}
          type="checkbox"
          ?checked=${this.checked}
          ?disabled=${this.disabled}
          @change=${this.dispatchChangeEvent.bind(this)}
        />
        <span></span>
      </label>
    `}dispatchChangeEvent(){this.dispatchEvent(new CustomEvent("switchChange",{detail:this.inputElementRef.value?.checked,bubbles:!0,composed:!0}))}};Ei.styles=[w,m,Ci],ki([A({type:Boolean})],Ei.prototype,"checked",void 0),ki([A({type:Boolean})],Ei.prototype,"disabled",void 0),ki([A()],Ei.prototype,"size",void 0),Ei=ki([B("wui-toggle")],Ei);const Ri=d`
  :host {
    height: auto;
  }

  :host > wui-flex {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: ${({spacing:e})=>e[2]};
    padding: ${({spacing:e})=>e[2]} ${({spacing:e})=>e[3]};
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    border-radius: ${({borderRadius:e})=>e[4]};
    box-shadow: inset 0 0 0 1px ${({tokens:e})=>e.theme.foregroundPrimary};
    transition: background-color ${({durations:e})=>e.lg}
      ${({easings:e})=>e["ease-out-power-2"]};
    will-change: background-color;
    cursor: pointer;
  }

  wui-switch {
    pointer-events: none;
  }
`;var Ti=function(e,t,i,n){var o,r=arguments.length,s=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,n);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r<3?o(s):r>3?o(t,i,s):o(t,i))||s);return r>3&&s&&Object.defineProperty(t,i,s),s};let Ii=class extends e{constructor(){super(...arguments),this.checked=!1}render(){return a`
      <wui-flex>
        <wui-icon size="xl" name="walletConnectBrown"></wui-icon>
        <wui-toggle
          ?checked=${this.checked}
          size="sm"
          @switchChange=${this.handleToggleChange.bind(this)}
        ></wui-toggle>
      </wui-flex>
    `}handleToggleChange(e){e.stopPropagation(),this.checked=e.detail,this.dispatchSwitchEvent()}dispatchSwitchEvent(){this.dispatchEvent(new CustomEvent("certifiedSwitchChange",{detail:this.checked,bubbles:!0,composed:!0}))}};Ii.styles=[w,m,Ri],Ti([A({type:Boolean})],Ii.prototype,"checked",void 0),Ii=Ti([B("wui-certified-switch")],Ii);const Si=d`
  :host {
    position: relative;
    width: 100%;
    display: inline-flex;
    flex-direction: column;
    gap: ${({spacing:e})=>e[3]};
    color: ${({tokens:e})=>e.theme.textPrimary};
    caret-color: ${({tokens:e})=>e.core.textAccentPrimary};
  }

  .wui-input-text-container {
    position: relative;
    display: flex;
  }

  input {
    width: 100%;
    border-radius: ${({borderRadius:e})=>e[4]};
    color: inherit;
    background: transparent;
    border: 1px solid ${({tokens:e})=>e.theme.borderPrimary};
    caret-color: ${({tokens:e})=>e.core.textAccentPrimary};
    padding: ${({spacing:e})=>e[3]} ${({spacing:e})=>e[3]}
      ${({spacing:e})=>e[3]} ${({spacing:e})=>e[10]};
    font-size: ${({textSize:e})=>e.large};
    line-height: ${({typography:e})=>e["lg-regular"].lineHeight};
    letter-spacing: ${({typography:e})=>e["lg-regular"].letterSpacing};
    font-weight: ${({fontWeight:e})=>e.regular};
    font-family: ${({fontFamily:e})=>e.regular};
  }

  input[data-size='lg'] {
    padding: ${({spacing:e})=>e[4]} ${({spacing:e})=>e[3]}
      ${({spacing:e})=>e[4]} ${({spacing:e})=>e[10]};
  }

  @media (hover: hover) and (pointer: fine) {
    input:hover:enabled {
      border: 1px solid ${({tokens:e})=>e.theme.borderSecondary};
    }
  }

  input:disabled {
    cursor: unset;
    border: 1px solid ${({tokens:e})=>e.theme.borderPrimary};
  }

  input::placeholder {
    color: ${({tokens:e})=>e.theme.textSecondary};
  }

  input:focus:enabled {
    border: 1px solid ${({tokens:e})=>e.theme.borderSecondary};
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    -webkit-box-shadow: 0px 0px 0px 4px ${({tokens:e})=>e.core.foregroundAccent040};
    -moz-box-shadow: 0px 0px 0px 4px ${({tokens:e})=>e.core.foregroundAccent040};
    box-shadow: 0px 0px 0px 4px ${({tokens:e})=>e.core.foregroundAccent040};
  }

  div.wui-input-text-container:has(input:disabled) {
    opacity: 0.5;
  }

  wui-icon.wui-input-text-left-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    left: ${({spacing:e})=>e[4]};
    color: ${({tokens:e})=>e.theme.iconDefault};
  }

  button.wui-input-text-submit-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: ${({spacing:e})=>e[3]};
    width: 24px;
    height: 24px;
    border: none;
    background: transparent;
    border-radius: ${({borderRadius:e})=>e[2]};
    color: ${({tokens:e})=>e.core.textAccentPrimary};
  }

  button.wui-input-text-submit-button:disabled {
    opacity: 1;
  }

  button.wui-input-text-submit-button.loading wui-icon {
    animation: spin 1s linear infinite;
  }

  button.wui-input-text-submit-button:hover {
    background: ${({tokens:e})=>e.core.foregroundAccent010};
  }

  input:has(+ .wui-input-text-submit-button) {
    padding-right: ${({spacing:e})=>e[12]};
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }

  input[type='search']::-webkit-search-decoration,
  input[type='search']::-webkit-search-cancel-button,
  input[type='search']::-webkit-search-results-button,
  input[type='search']::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  /* -- Keyframes --------------------------------------------------- */
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;var Pi=function(e,t,i,n){var o,r=arguments.length,s=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,n);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r<3?o(s):r>3?o(t,i,s):o(t,i))||s);return r>3&&s&&Object.defineProperty(t,i,s),s};let Ai=class extends e{constructor(){super(...arguments),this.inputElementRef=yi(),this.disabled=!1,this.loading=!1,this.placeholder="",this.type="text",this.value="",this.size="md"}render(){return a` <div class="wui-input-text-container">
        ${this.templateLeftIcon()}
        <input
          data-size=${this.size}
          ${$i(this.inputElementRef)}
          data-testid="wui-input-text"
          type=${this.type}
          enterkeyhint=${O(this.enterKeyHint)}
          ?disabled=${this.disabled}
          placeholder=${this.placeholder}
          @input=${this.dispatchInputChangeEvent.bind(this)}
          @keydown=${this.onKeyDown}
          .value=${this.value||""}
        />
        ${this.templateSubmitButton()}
        <slot class="wui-input-text-slot"></slot>
      </div>
      ${this.templateError()} ${this.templateWarning()}`}templateLeftIcon(){return this.icon?a`<wui-icon
        class="wui-input-text-left-icon"
        size="md"
        data-size=${this.size}
        color="inherit"
        name=${this.icon}
      ></wui-icon>`:null}templateSubmitButton(){return this.onSubmit?a`<button
        class="wui-input-text-submit-button ${this.loading?"loading":""}"
        @click=${this.onSubmit?.bind(this)}
        ?disabled=${this.disabled||this.loading}
      >
        ${this.loading?a`<wui-icon name="spinner" size="md"></wui-icon>`:a`<wui-icon name="chevronRight" size="md"></wui-icon>`}
      </button>`:null}templateError(){return this.errorText?a`<wui-text variant="sm-regular" color="error">${this.errorText}</wui-text>`:null}templateWarning(){return this.warningText?a`<wui-text variant="sm-regular" color="warning">${this.warningText}</wui-text>`:null}dispatchInputChangeEvent(){this.dispatchEvent(new CustomEvent("inputChange",{detail:this.inputElementRef.value?.value,bubbles:!0,composed:!0}))}};Ai.styles=[w,m,Si],Pi([A()],Ai.prototype,"icon",void 0),Pi([A({type:Boolean})],Ai.prototype,"disabled",void 0),Pi([A({type:Boolean})],Ai.prototype,"loading",void 0),Pi([A()],Ai.prototype,"placeholder",void 0),Pi([A()],Ai.prototype,"type",void 0),Pi([A()],Ai.prototype,"value",void 0),Pi([A()],Ai.prototype,"errorText",void 0),Pi([A()],Ai.prototype,"warningText",void 0),Pi([A()],Ai.prototype,"onSubmit",void 0),Pi([A()],Ai.prototype,"size",void 0),Pi([A({attribute:!1})],Ai.prototype,"onKeyDown",void 0),Ai=Pi([B("wui-input-text")],Ai);const Li=d`
  :host {
    position: relative;
    display: inline-block;
    width: 100%;
  }

  wui-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: ${({spacing:e})=>e[3]};
    color: ${({tokens:e})=>e.theme.iconDefault};
    cursor: pointer;
    padding: ${({spacing:e})=>e[2]};
    background-color: transparent;
    border-radius: ${({borderRadius:e})=>e[4]};
    transition: background-color ${({durations:e})=>e.lg}
      ${({easings:e})=>e["ease-out-power-2"]};
  }

  @media (hover: hover) {
    wui-icon:hover {
      background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
    }
  }
`;var Bi=function(e,t,i,n){var o,r=arguments.length,s=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,n);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r<3?o(s):r>3?o(t,i,s):o(t,i))||s);return r>3&&s&&Object.defineProperty(t,i,s),s};let Oi=class extends e{constructor(){super(...arguments),this.inputComponentRef=yi(),this.inputValue=""}render(){return a`
      <wui-input-text
        ${$i(this.inputComponentRef)}
        placeholder="Search wallet"
        icon="search"
        type="search"
        enterKeyHint="search"
        size="sm"
        @inputChange=${this.onInputChange}
      >
        ${this.inputValue?a`<wui-icon
              @click=${this.clearValue}
              color="inherit"
              size="sm"
              name="close"
            ></wui-icon>`:null}
      </wui-input-text>
    `}onInputChange(e){this.inputValue=e.detail||""}clearValue(){const e=this.inputComponentRef.value,t=e?.inputElementRef.value;t&&(t.value="",this.inputValue="",t.focus(),t.dispatchEvent(new Event("input")))}};Oi.styles=[w,Li],Bi([A()],Oi.prototype,"inputValue",void 0),Oi=Bi([B("wui-search-bar")],Oi);const ji=d`
  :host {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 104px;
    width: 104px;
    row-gap: ${({spacing:e})=>e[2]};
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    border-radius: ${({borderRadius:e})=>e[5]};
    position: relative;
  }

  wui-shimmer[data-type='network'] {
    border: none;
    -webkit-clip-path: var(--apkt-path-network);
    clip-path: var(--apkt-path-network);
  }

  svg {
    position: absolute;
    width: 48px;
    height: 54px;
    z-index: 1;
  }

  svg > path {
    stroke: ${({tokens:e})=>e.theme.foregroundSecondary};
    stroke-width: 1px;
  }

  @media (max-width: 350px) {
    :host {
      width: 100%;
    }
  }
`;var Ni=function(e,t,i,n){var o,r=arguments.length,s=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,n);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r<3?o(s):r>3?o(t,i,s):o(t,i))||s);return r>3&&s&&Object.defineProperty(t,i,s),s};let Mi=class extends e{constructor(){super(...arguments),this.type="wallet"}render(){return a`
      ${this.shimmerTemplate()}
      <wui-shimmer width="80px" height="20px"></wui-shimmer>
    `}shimmerTemplate(){return"network"===this.type?a` <wui-shimmer data-type=${this.type} width="48px" height="54px"></wui-shimmer>
        ${z}`:a`<wui-shimmer width="56px" height="56px"></wui-shimmer>`}};Mi.styles=[w,m,ji],Ni([A()],Mi.prototype,"type",void 0),Mi=Ni([B("wui-card-select-loader")],Mi);const Wi=S`
  :host {
    display: grid;
    width: inherit;
    height: inherit;
  }
`;var zi=function(e,t,i,n){var o,r=arguments.length,s=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,n);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r<3?o(s):r>3?o(t,i,s):o(t,i))||s);return r>3&&s&&Object.defineProperty(t,i,s),s};let _i=class extends e{render(){return this.style.cssText=`\n      grid-template-rows: ${this.gridTemplateRows};\n      grid-template-columns: ${this.gridTemplateColumns};\n      justify-items: ${this.justifyItems};\n      align-items: ${this.alignItems};\n      justify-content: ${this.justifyContent};\n      align-content: ${this.alignContent};\n      column-gap: ${this.columnGap&&`var(--apkt-spacing-${this.columnGap})`};\n      row-gap: ${this.rowGap&&`var(--apkt-spacing-${this.rowGap})`};\n      gap: ${this.gap&&`var(--apkt-spacing-${this.gap})`};\n      padding-top: ${this.padding&&j.getSpacingStyles(this.padding,0)};\n      padding-right: ${this.padding&&j.getSpacingStyles(this.padding,1)};\n      padding-bottom: ${this.padding&&j.getSpacingStyles(this.padding,2)};\n      padding-left: ${this.padding&&j.getSpacingStyles(this.padding,3)};\n      margin-top: ${this.margin&&j.getSpacingStyles(this.margin,0)};\n      margin-right: ${this.margin&&j.getSpacingStyles(this.margin,1)};\n      margin-bottom: ${this.margin&&j.getSpacingStyles(this.margin,2)};\n      margin-left: ${this.margin&&j.getSpacingStyles(this.margin,3)};\n    `,a`<slot></slot>`}};_i.styles=[w,Wi],zi([A()],_i.prototype,"gridTemplateRows",void 0),zi([A()],_i.prototype,"gridTemplateColumns",void 0),zi([A()],_i.prototype,"justifyItems",void 0),zi([A()],_i.prototype,"alignItems",void 0),zi([A()],_i.prototype,"justifyContent",void 0),zi([A()],_i.prototype,"alignContent",void 0),zi([A()],_i.prototype,"columnGap",void 0),zi([A()],_i.prototype,"rowGap",void 0),zi([A()],_i.prototype,"gap",void 0),zi([A()],_i.prototype,"padding",void 0),zi([A()],_i.prototype,"margin",void 0),_i=zi([B("wui-grid")],_i);const Di=d`
  button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 104px;
    row-gap: ${({spacing:e})=>e[2]};
    padding: ${({spacing:e})=>e[3]} ${({spacing:e})=>e[0]};
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    border-radius: clamp(0px, ${({borderRadius:e})=>e[4]}, 20px);
    transition:
      color ${({durations:e})=>e.lg} ${({easings:e})=>e["ease-out-power-1"]},
      background-color ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-1"]},
      border-radius ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-1"]};
    will-change: background-color, color, border-radius;
    outline: none;
    border: none;
  }

  button > wui-flex > wui-text {
    color: ${({tokens:e})=>e.theme.textPrimary};
    max-width: 86px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    justify-content: center;
  }

  button > wui-flex > wui-text.certified {
    max-width: 66px;
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled {
      background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
    }
  }

  button:disabled > wui-flex > wui-text {
    color: ${({tokens:e})=>e.core.glass010};
  }

  [data-selected='true'] {
    background-color: ${({colors:e})=>e.accent020};
  }

  @media (hover: hover) and (pointer: fine) {
    [data-selected='true']:hover:enabled {
      background-color: ${({colors:e})=>e.accent010};
    }
  }

  [data-selected='true']:active:enabled {
    background-color: ${({colors:e})=>e.accent010};
  }

  @media (max-width: 350px) {
    button {
      width: 100%;
    }
  }
`;var Ui=function(e,t,i,n){var o,r=arguments.length,s=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,n);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r<3?o(s):r>3?o(t,i,s):o(t,i))||s);return r>3&&s&&Object.defineProperty(t,i,s),s};let Fi=class extends e{constructor(){super(),this.observer=new IntersectionObserver(()=>{}),this.visible=!1,this.imageSrc=void 0,this.imageLoading=!1,this.isImpressed=!1,this.explorerId="",this.walletQuery="",this.certified=!1,this.displayIndex=0,this.wallet=void 0,this.observer=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting?(this.visible=!0,this.fetchImageSrc(),this.sendImpressionEvent()):this.visible=!1})},{threshold:.01})}firstUpdated(){this.observer.observe(this)}disconnectedCallback(){this.observer.disconnect()}render(){const e="certified"===this.wallet?.badge_type;return a`
      <button>
        ${this.imageTemplate()}
        <wui-flex flexDirection="row" alignItems="center" justifyContent="center" gap="1">
          <wui-text
            variant="md-regular"
            color="inherit"
            class=${O(e?"certified":void 0)}
            >${this.wallet?.name}</wui-text
          >
          ${e?a`<wui-icon size="sm" name="walletConnectBrown"></wui-icon>`:null}
        </wui-flex>
      </button>
    `}imageTemplate(){return!this.visible&&!this.imageSrc||this.imageLoading?this.shimmerTemplate():a`
      <wui-wallet-image
        size="lg"
        imageSrc=${O(this.imageSrc)}
        name=${O(this.wallet?.name)}
        .installed=${this.wallet?.installed??!1}
        badgeSize="sm"
      >
      </wui-wallet-image>
    `}shimmerTemplate(){return a`<wui-shimmer width="56px" height="56px"></wui-shimmer>`}async fetchImageSrc(){this.wallet&&(this.imageSrc=p.getWalletImage(this.wallet),this.imageSrc||(this.imageLoading=!0,this.imageSrc=await p.fetchWalletImage(this.wallet.image_id),this.imageLoading=!1))}sendImpressionEvent(){this.wallet&&!this.isImpressed&&(this.isImpressed=!0,l.sendWalletImpressionEvent({name:this.wallet.name,walletRank:this.wallet.order,explorerId:this.explorerId,view:c.state.view,query:this.walletQuery,certified:this.certified,displayIndex:this.displayIndex}))}};Fi.styles=Di,Ui([L()],Fi.prototype,"visible",void 0),Ui([L()],Fi.prototype,"imageSrc",void 0),Ui([L()],Fi.prototype,"imageLoading",void 0),Ui([L()],Fi.prototype,"isImpressed",void 0),Ui([A()],Fi.prototype,"explorerId",void 0),Ui([A()],Fi.prototype,"walletQuery",void 0),Ui([A()],Fi.prototype,"certified",void 0),Ui([A()],Fi.prototype,"displayIndex",void 0),Ui([A({type:Object})],Fi.prototype,"wallet",void 0),Fi=Ui([B("w3m-all-wallets-list-item")],Fi);const Vi=d`
  wui-grid {
    max-height: clamp(360px, 400px, 80vh);
    overflow: scroll;
    scrollbar-width: none;
    grid-auto-rows: min-content;
    grid-template-columns: repeat(auto-fill, 104px);
  }

  :host([data-mobile-fullscreen='true']) wui-grid {
    max-height: none;
  }

  @media (max-width: 350px) {
    wui-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  wui-grid[data-scroll='false'] {
    overflow: hidden;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  w3m-all-wallets-list-item {
    opacity: 0;
    animation-duration: ${({durations:e})=>e.xl};
    animation-timing-function: ${({easings:e})=>e["ease-inout-power-2"]};
    animation-name: fade-in;
    animation-fill-mode: forwards;
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  wui-loading-spinner {
    padding-top: ${({spacing:e})=>e[4]};
    padding-bottom: ${({spacing:e})=>e[4]};
    justify-content: center;
    grid-column: 1 / span 4;
  }
`;var qi=function(e,t,i,n){var o,r=arguments.length,s=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,n);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r<3?o(s):r>3?o(t,i,s):o(t,i))||s);return r>3&&s&&Object.defineProperty(t,i,s),s};const Hi="local-paginator";let Ki=class extends e{constructor(){super(),this.unsubscribe=[],this.paginationObserver=void 0,this.loading=!i.state.wallets.length,this.wallets=i.state.wallets,this.mobileFullScreen=n.state.enableMobileFullScreen,this.unsubscribe.push(i.subscribeKey("wallets",e=>this.wallets=e))}firstUpdated(){this.initialFetch(),this.createPaginationObserver()}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),this.paginationObserver?.disconnect()}render(){return this.mobileFullScreen&&this.setAttribute("data-mobile-fullscreen","true"),a`
      <wui-grid
        data-scroll=${!this.loading}
        .padding=${["0","3","3","3"]}
        gap="2"
        justifyContent="space-between"
      >
        ${this.loading?this.shimmerTemplate(16):this.walletsTemplate()}
        ${this.paginationLoaderTemplate()}
      </wui-grid>
    `}async initialFetch(){this.loading=!0;const e=this.shadowRoot?.querySelector("wui-grid");e&&(await i.fetchWalletsByPage({page:1}),await e.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.loading=!1,e.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"}))}shimmerTemplate(e,t){return[...Array(e)].map(()=>a`
        <wui-card-select-loader type="wallet" id=${O(t)}></wui-card-select-loader>
      `)}walletsTemplate(){return P.getWalletConnectWallets(this.wallets).map((e,t)=>a`
        <w3m-all-wallets-list-item
          data-testid="wallet-search-item-${e.id}"
          @click=${()=>this.onConnectWallet(e)}
          .wallet=${e}
          explorerId=${e.id}
          certified=${"certified"===this.badge}
          displayIndex=${t}
        ></w3m-all-wallets-list-item>
      `)}paginationLoaderTemplate(){const{wallets:e,recommended:t,featured:n,count:o,mobileFilteredOutWalletsLength:r}=i.state,s=window.innerWidth<352?3:4,a=e.length+t.length;let l=Math.ceil(a/s)*s-a+s;return l-=e.length?n.length%s:0,0===o&&n.length>0?null:0===o||[...n,...e,...t].length<o-(r??0)?this.shimmerTemplate(l,Hi):null}createPaginationObserver(){const e=this.shadowRoot?.querySelector(`#${Hi}`);e&&(this.paginationObserver=new IntersectionObserver(([e])=>{if(e?.isIntersecting&&!this.loading){const{page:e,count:t,wallets:n}=i.state;n.length<t&&i.fetchWalletsByPage({page:e+1})}}),this.paginationObserver.observe(e))}onConnectWallet(e){t.selectWalletConnector(e)}};Ki.styles=Vi,qi([L()],Ki.prototype,"loading",void 0),qi([L()],Ki.prototype,"wallets",void 0),qi([L()],Ki.prototype,"badge",void 0),qi([L()],Ki.prototype,"mobileFullScreen",void 0),Ki=qi([B("w3m-all-wallets-list")],Ki);const Yi=S`
  wui-grid,
  wui-loading-spinner,
  wui-flex {
    height: 360px;
  }

  wui-grid {
    overflow: scroll;
    scrollbar-width: none;
    grid-auto-rows: min-content;
    grid-template-columns: repeat(auto-fill, 104px);
  }

  :host([data-mobile-fullscreen='true']) wui-grid {
    max-height: none;
    height: auto;
  }

  wui-grid[data-scroll='false'] {
    overflow: hidden;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  wui-loading-spinner {
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 350px) {
    wui-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;var Ji=function(e,t,i,n){var o,r=arguments.length,s=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,n);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r<3?o(s):r>3?o(t,i,s):o(t,i))||s);return r>3&&s&&Object.defineProperty(t,i,s),s};let Gi=class extends e{constructor(){super(...arguments),this.prevQuery="",this.prevBadge=void 0,this.loading=!0,this.mobileFullScreen=n.state.enableMobileFullScreen,this.query=""}render(){return this.mobileFullScreen&&this.setAttribute("data-mobile-fullscreen","true"),this.onSearch(),this.loading?a`<wui-loading-spinner color="accent-primary"></wui-loading-spinner>`:this.walletsTemplate()}async onSearch(){this.query.trim()===this.prevQuery.trim()&&this.badge===this.prevBadge||(this.prevQuery=this.query,this.prevBadge=this.badge,this.loading=!0,await i.searchWallet({search:this.query,badge:this.badge}),this.loading=!1)}walletsTemplate(){const{search:e}=i.state,t=P.markWalletsAsInstalled(e),n=P.filterWalletsByWcSupport(t);return n.length?a`
      <wui-grid
        data-testid="wallet-list"
        .padding=${["0","3","3","3"]}
        rowGap="4"
        columngap="2"
        justifyContent="space-between"
      >
        ${n.map((e,t)=>a`
            <w3m-all-wallets-list-item
              @click=${()=>this.onConnectWallet(e)}
              .wallet=${e}
              data-testid="wallet-search-item-${e.id}"
              explorerId=${e.id}
              certified=${"certified"===this.badge}
              walletQuery=${this.query}
              displayIndex=${t}
            ></w3m-all-wallets-list-item>
          `)}
      </wui-grid>
    `:a`
        <wui-flex
          data-testid="no-wallet-found"
          justifyContent="center"
          alignItems="center"
          gap="3"
          flexDirection="column"
        >
          <wui-icon-box size="lg" color="default" icon="wallet"></wui-icon-box>
          <wui-text data-testid="no-wallet-found-text" color="secondary" variant="md-medium">
            No Wallet found
          </wui-text>
        </wui-flex>
      `}onConnectWallet(e){t.selectWalletConnector(e)}};Gi.styles=Yi,Ji([L()],Gi.prototype,"loading",void 0),Ji([L()],Gi.prototype,"mobileFullScreen",void 0),Ji([A()],Gi.prototype,"query",void 0),Ji([A()],Gi.prototype,"badge",void 0),Gi=Ji([B("w3m-all-wallets-search")],Gi);var Qi=function(e,t,i,n){var o,r=arguments.length,s=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,n);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r<3?o(s):r>3?o(t,i,s):o(t,i))||s);return r>3&&s&&Object.defineProperty(t,i,s),s};let Xi=class extends e{constructor(){super(...arguments),this.search="",this.badge=void 0,this.onDebouncedSearch=o.debounce(e=>{this.search=e})}render(){const e=this.search.length>=2;return a`
      <wui-flex .padding=${["1","3","3","3"]} gap="2" alignItems="center">
        <wui-search-bar @inputChange=${this.onInputChange.bind(this)}></wui-search-bar>
        <wui-certified-switch
          ?checked=${"certified"===this.badge}
          @certifiedSwitchChange=${this.onCertifiedSwitchChange.bind(this)}
          data-testid="wui-certified-switch"
        ></wui-certified-switch>
        ${this.qrButtonTemplate()}
      </wui-flex>
      ${e||this.badge?a`<w3m-all-wallets-search
            query=${this.search}
            .badge=${this.badge}
          ></w3m-all-wallets-search>`:a`<w3m-all-wallets-list .badge=${this.badge}></w3m-all-wallets-list>`}
    `}onInputChange(e){this.onDebouncedSearch(e.detail)}onCertifiedSwitchChange(e){e.detail?(this.badge="certified",y.showSvg("Only WalletConnect certified",{icon:"walletConnectBrown",iconColor:"accent-100"})):this.badge=void 0}qrButtonTemplate(){return o.isMobile()?a`
        <wui-icon-box
          size="xl"
          iconSize="xl"
          color="accent-primary"
          icon="qrCode"
          border
          borderColor="wui-accent-glass-010"
          @click=${this.onWalletConnectQr.bind(this)}
        ></wui-icon-box>
      `:null}onWalletConnectQr(){c.push("ConnectingWalletConnect")}};Qi([L()],Xi.prototype,"search",void 0),Qi([L()],Xi.prototype,"badge",void 0),Xi=Qi([B("w3m-all-wallets-view")],Xi);var Zi=function(e,t,i,n){var o,r=arguments.length,s=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,n);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(s=(r<3?o(s):r>3?o(t,i,s):o(t,i))||s);return r>3&&s&&Object.defineProperty(t,i,s),s};let en=class extends e{constructor(){super(...arguments),this.wallet=c.state.data?.wallet}render(){if(!this.wallet)throw new Error("w3m-downloads-view");return a`
      <wui-flex gap="2" flexDirection="column" .padding=${["3","3","4","3"]}>
        ${this.chromeTemplate()} ${this.iosTemplate()} ${this.androidTemplate()}
        ${this.homepageTemplate()}
      </wui-flex>
    `}chromeTemplate(){return this.wallet?.chrome_store?a`<wui-list-item
      variant="icon"
      icon="chromeStore"
      iconVariant="square"
      @click=${this.onChromeStore.bind(this)}
      chevron
    >
      <wui-text variant="md-medium" color="primary">Chrome Extension</wui-text>
    </wui-list-item>`:null}iosTemplate(){return this.wallet?.app_store?a`<wui-list-item
      variant="icon"
      icon="appStore"
      iconVariant="square"
      @click=${this.onAppStore.bind(this)}
      chevron
    >
      <wui-text variant="md-medium" color="primary">iOS App</wui-text>
    </wui-list-item>`:null}androidTemplate(){return this.wallet?.play_store?a`<wui-list-item
      variant="icon"
      icon="playStore"
      iconVariant="square"
      @click=${this.onPlayStore.bind(this)}
      chevron
    >
      <wui-text variant="md-medium" color="primary">Android App</wui-text>
    </wui-list-item>`:null}homepageTemplate(){return this.wallet?.homepage?a`
      <wui-list-item
        variant="icon"
        icon="browser"
        iconVariant="square-blue"
        @click=${this.onHomePage.bind(this)}
        chevron
      >
        <wui-text variant="md-medium" color="primary">Website</wui-text>
      </wui-list-item>
    `:null}openStore(e){e.href&&this.wallet&&(l.sendEvent({type:"track",event:"GET_WALLET",properties:{name:this.wallet.name,walletRank:this.wallet.order,explorerId:this.wallet.id,type:e.type}}),o.openHref(e.href,"_blank"))}onChromeStore(){this.wallet?.chrome_store&&this.openStore({href:this.wallet.chrome_store,type:"chrome_store"})}onAppStore(){this.wallet?.app_store&&this.openStore({href:this.wallet.app_store,type:"app_store"})}onPlayStore(){this.wallet?.play_store&&this.openStore({href:this.wallet.play_store,type:"play_store"})}onHomePage(){this.wallet?.homepage&&this.openStore({href:this.wallet.homepage,type:"homepage"})}};en=Zi([B("w3m-downloads-view")],en);export{Xi as W3mAllWalletsView,ui as W3mConnectingWcBasicView,en as W3mDownloadsView};
