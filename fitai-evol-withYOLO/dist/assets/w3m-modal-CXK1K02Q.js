import{N as e,u as t,R as i,S as o,b as a,c as n,E as r,v as s,x as c,j as l,B as d,a as u,y as p,z as h,D as m,o as w,F as g,C as y,G as f,M as b,I as v,e as k,r as x,i as T,d as S,k as A,w as $,P,J as C,K as I,L as E,H as N,O as R,Q as O,h as z,U as D,t as U,f as W,A as j,T as B,V as F,X as L}from"./core-DTDfQNfi.js";import{c as q,n as _,o as M,r as H,a as V,U as K,b as Q}from"./index-DRLW8ZIi.js";import{p as G,s as Y}from"./vanilla-D-GFjGkU.js";import"./vendor-web3-t_Qnd68m.js";import"./vendor-react-DBi_nVUE.js";import"./index-BxKeiviE.js";import"./vendor-ai-CVwChM-s.js";const X={getGasPriceInEther:(e,t)=>Number(t*e)/1e18,getGasPriceInUSD(t,i,o){const a=X.getGasPriceInEther(i,o);return e.bigNumber(t).times(a).toNumber()},getPriceImpact({sourceTokenAmount:t,sourceTokenPriceInUSD:i,toTokenPriceInUSD:o,toTokenAmount:a}){const n=e.bigNumber(t).times(i),r=e.bigNumber(a).times(o);return n.minus(r).div(n).times(100).toNumber()},getMaxSlippage(t,i){const o=e.bigNumber(t).div(100);return e.multiply(i,o).toNumber()},getProviderFee:(t,i=.0085)=>e.bigNumber(t).times(i).toString(),isInsufficientNetworkTokenForGas(t,i){const o=i||"0";return!!e.bigNumber(t).eq(0)||e.bigNumber(e.bigNumber(o)).gt(t)},isInsufficientSourceTokenForSwap(t,i,o){const a=o?.find(e=>e.address===i)?.quantity?.numeric;return e.bigNumber(a||"0").lt(t)}},Z=15e4,J={initializing:!1,initialized:!1,loadingPrices:!1,loadingQuote:!1,loadingApprovalTransaction:!1,loadingBuildTransaction:!1,loadingTransaction:!1,switchingTokens:!1,fetchError:!1,approvalTransaction:void 0,swapTransaction:void 0,transactionError:void 0,sourceToken:void 0,sourceTokenAmount:"",sourceTokenPriceInUSD:0,toToken:void 0,toTokenAmount:"",toTokenPriceInUSD:0,networkPrice:"0",networkBalanceInUSD:"0",networkTokenSymbol:"",inputError:void 0,slippage:w.CONVERT_SLIPPAGE_TOLERANCE,tokens:void 0,popularTokens:void 0,suggestedTokens:void 0,foundTokens:void 0,myTokensWithBalance:void 0,tokensPriceMap:{},gasFee:"0",gasPriceInUSD:0,priceImpact:void 0,maxSlippage:void 0,providerFee:void 0},ee=G({...J}),te={state:ee,subscribe:e=>Y(ee,()=>e(ee)),subscribeKey:(e,t)=>f(ee,e,t),getParams(){const t=l.state.activeChain,i=l.getAccountData(t)?.caipAddress??l.state.activeCaipAddress,o=u.getPlainAddress(i),a=g(),r=y.getConnectorId(l.state.activeChain);if(!o)throw new Error("No address found to swap the tokens from.");const s=!ee.toToken?.address||!ee.toToken?.decimals,c=!ee.sourceToken?.address||!ee.sourceToken?.decimals||!e.bigNumber(ee.sourceTokenAmount).gt(0),d=!ee.sourceTokenAmount;return{networkAddress:a,fromAddress:o,fromCaipAddress:i,sourceTokenAddress:ee.sourceToken?.address,toTokenAddress:ee.toToken?.address,toTokenAmount:ee.toTokenAmount,toTokenDecimals:ee.toToken?.decimals,sourceTokenAmount:ee.sourceTokenAmount,sourceTokenDecimals:ee.sourceToken?.decimals,invalidToToken:s,invalidSourceToken:c,invalidSourceTokenAmount:d,availableToSwap:i&&!s&&!c&&!d,isAuthConnector:r===n.CONNECTOR_ID.AUTH}},async setSourceToken(e){if(!e)return ee.sourceToken=e,ee.sourceTokenAmount="",void(ee.sourceTokenPriceInUSD=0);ee.sourceToken=e,await ie.setTokenPrice(e.address,"sourceToken")},setSourceTokenAmount(e){ee.sourceTokenAmount=e},async setToToken(e){if(!e)return ee.toToken=e,ee.toTokenAmount="",void(ee.toTokenPriceInUSD=0);ee.toToken=e,await ie.setTokenPrice(e.address,"toToken")},setToTokenAmount(t){ee.toTokenAmount=t?e.toFixed(t,6):""},async setTokenPrice(e,t){let i=ee.tokensPriceMap[e]||0;i||(ee.loadingPrices=!0,i=await ie.getAddressPrice(e)),"sourceToken"===t?ee.sourceTokenPriceInUSD=i:"toToken"===t&&(ee.toTokenPriceInUSD=i),ee.loadingPrices&&(ee.loadingPrices=!1),ie.getParams().availableToSwap&&!ee.switchingTokens&&ie.swapTokens()},async switchTokens(){if(!ee.initializing&&ee.initialized&&!ee.switchingTokens){ee.switchingTokens=!0;try{const e=ee.toToken?{...ee.toToken}:void 0,t=ee.sourceToken?{...ee.sourceToken}:void 0,i=e&&""===ee.toTokenAmount?"1":ee.toTokenAmount;ie.setSourceTokenAmount(i),ie.setToTokenAmount(""),await ie.setSourceToken(e),await ie.setToToken(t),ee.switchingTokens=!1,ie.swapTokens()}catch(e){throw ee.switchingTokens=!1,e}}},resetState(){ee.myTokensWithBalance=J.myTokensWithBalance,ee.tokensPriceMap=J.tokensPriceMap,ee.initialized=J.initialized,ee.initializing=J.initializing,ee.switchingTokens=J.switchingTokens,ee.sourceToken=J.sourceToken,ee.sourceTokenAmount=J.sourceTokenAmount,ee.sourceTokenPriceInUSD=J.sourceTokenPriceInUSD,ee.toToken=J.toToken,ee.toTokenAmount=J.toTokenAmount,ee.toTokenPriceInUSD=J.toTokenPriceInUSD,ee.networkPrice=J.networkPrice,ee.networkTokenSymbol=J.networkTokenSymbol,ee.networkBalanceInUSD=J.networkBalanceInUSD,ee.inputError=J.inputError},resetValues(){const{networkAddress:e}=ie.getParams(),t=ee.tokens?.find(t=>t.address===e);ie.setSourceToken(t),ie.setToToken(void 0)},getApprovalLoadingState:()=>ee.loadingApprovalTransaction,clearError(){ee.transactionError=void 0},async initializeState(){if(!ee.initializing){if(ee.initializing=!0,!ee.initialized)try{await ie.fetchTokens(),ee.initialized=!0}catch(e){ee.initialized=!1,o.showError("Failed to initialize swap"),i.goBack()}ee.initializing=!1}},async fetchTokens(){const{networkAddress:e}=ie.getParams();await ie.getNetworkTokenPrice(),await ie.getMyTokensWithBalance();const t=ee.myTokensWithBalance?.find(t=>t.address===e);t&&(ee.networkTokenSymbol=t.symbol,ie.setSourceToken(t),ie.setSourceTokenAmount("0"))},async getTokenList(){const e=l.state.activeCaipNetwork?.caipNetworkId;if(ee.caipNetworkId!==e||!ee.tokens)try{ee.tokensLoading=!0;const t=await p.getTokenList(e);ee.tokens=t,ee.caipNetworkId=e,ee.popularTokens=t.sort((e,t)=>e.symbol<t.symbol?-1:e.symbol>t.symbol?1:0);const i=(e&&w.SUGGESTED_TOKENS_BY_CHAIN?.[e]||[]).map(e=>t.find(t=>t.symbol===e)).filter(e=>Boolean(e)),o=(w.SWAP_SUGGESTED_TOKENS||[]).map(e=>t.find(t=>t.symbol===e)).filter(e=>Boolean(e)).filter(e=>!i.some(t=>t.address===e.address));ee.suggestedTokens=[...i,...o]}catch(t){ee.tokens=[],ee.popularTokens=[],ee.suggestedTokens=[]}finally{ee.tokensLoading=!1}},async getAddressPrice(e){const t=ee.tokensPriceMap[e];if(t)return t;const i=await d.fetchTokenPrice({addresses:[e]}),o=i?.fungibles||[],a=[...ee.tokens||[],...ee.myTokensWithBalance||[]],n=a?.find(t=>t.address===e)?.symbol,r=o.find(e=>e.symbol.toLowerCase()===n?.toLowerCase())?.price||0,s=parseFloat(r.toString());return ee.tokensPriceMap[e]=s,s},async getNetworkTokenPrice(){const{networkAddress:e}=ie.getParams(),t=await d.fetchTokenPrice({addresses:[e]}).catch(()=>(o.showError("Failed to fetch network token price"),{fungibles:[]})),i=t.fungibles?.[0],a=i?.price.toString()||"0";ee.tokensPriceMap[e]=parseFloat(a),ee.networkTokenSymbol=i?.symbol||"",ee.networkPrice=a},async getMyTokensWithBalance(e){const t=await m.getMyTokensWithBalance({forceUpdate:e,caipNetwork:l.state.activeCaipNetwork,address:l.getAccountData()?.address}),i=p.mapBalancesToSwapTokens(t);i&&(await ie.getInitialGasPrice(),ie.setBalances(i))},setBalances(t){const{networkAddress:i}=ie.getParams(),o=l.state.activeCaipNetwork;if(!o)return;const a=t.find(e=>e.address===i);t.forEach(e=>{ee.tokensPriceMap[e.address]=e.price||0}),ee.myTokensWithBalance=t.filter(e=>e.address.startsWith(o.caipNetworkId)),ee.networkBalanceInUSD=a?e.multiply(a.quantity.numeric,a.price).toString():"0"},async getInitialGasPrice(){const t=await p.fetchGasPrice();if(!t)return{gasPrice:null,gasPriceInUSD:null};switch(l.state?.activeCaipNetwork?.chainNamespace){case n.CHAIN.SOLANA:return ee.gasFee=t.standard??"0",ee.gasPriceInUSD=e.multiply(t.standard,ee.networkPrice).div(1e9).toNumber(),{gasPrice:BigInt(ee.gasFee),gasPriceInUSD:Number(ee.gasPriceInUSD)};case n.CHAIN.EVM:default:const i=t.standard??"0",o=BigInt(i),a=BigInt(Z),r=X.getGasPriceInUSD(ee.networkPrice,a,o);return ee.gasFee=i,ee.gasPriceInUSD=r,{gasPrice:o,gasPriceInUSD:r}}},async swapTokens(){const t=l.getAccountData()?.address,i=ee.sourceToken,o=ee.toToken,a=e.bigNumber(ee.sourceTokenAmount).gt(0);if(a||ie.setToTokenAmount(""),!o||!i||ee.loadingPrices||!a||!t)return;ee.loadingQuote=!0;const n=e.bigNumber(ee.sourceTokenAmount).times(10**i.decimals).round(0).toFixed(0);try{const a=await d.fetchSwapQuote({userAddress:t,from:i.address,to:o.address,gasPrice:ee.gasFee,amount:n.toString()});ee.loadingQuote=!1;const r=a?.quotes?.[0]?.toAmount;if(!r)return void h.open({displayMessage:"Incorrect amount",debugMessage:"Please enter a valid amount"},"error");const s=e.bigNumber(r).div(10**o.decimals).toString();ie.setToTokenAmount(s);ie.hasInsufficientToken(ee.sourceTokenAmount,i.address)?ee.inputError="Insufficient balance":(ee.inputError=void 0,ie.setTransactionDetails())}catch(r){const e=await p.handleSwapError(r);ee.loadingQuote=!1,ee.inputError=e||"Insufficient balance"}},async getTransaction(){const{fromCaipAddress:e,availableToSwap:t}=ie.getParams(),a=ee.sourceToken,n=ee.toToken;if(e&&t&&a&&n&&!ee.loadingQuote)try{ee.loadingBuildTransaction=!0;let t;return t=await p.fetchSwapAllowance({userAddress:e,tokenAddress:a.address,sourceTokenAmount:ee.sourceTokenAmount,sourceTokenDecimals:a.decimals})?await ie.createSwapTransaction():await ie.createAllowanceTransaction(),ee.loadingBuildTransaction=!1,ee.fetchError=!1,t}catch(r){return i.goBack(),o.showError("Failed to check allowance"),ee.loadingBuildTransaction=!1,ee.approvalTransaction=void 0,ee.swapTransaction=void 0,void(ee.fetchError=!0)}},async createAllowanceTransaction(){const{fromCaipAddress:e,sourceTokenAddress:t,toTokenAddress:a}=ie.getParams();if(e&&a){if(!t)throw new Error("createAllowanceTransaction - No source token address found.");try{const i=await d.generateApproveCalldata({from:t,to:a,userAddress:e}),o=u.getPlainAddress(i.tx.from);if(!o)throw new Error("SwapController:createAllowanceTransaction - address is required");const n={data:i.tx.data,to:o,gasPrice:BigInt(i.tx.eip155.gasPrice),value:BigInt(i.tx.value),toAmount:ee.toTokenAmount};return ee.swapTransaction=void 0,ee.approvalTransaction={data:n.data,to:n.to,gasPrice:n.gasPrice,value:n.value,toAmount:n.toAmount},{data:n.data,to:n.to,gasPrice:n.gasPrice,value:n.value,toAmount:n.toAmount}}catch(n){return i.goBack(),o.showError("Failed to create approval transaction"),ee.approvalTransaction=void 0,ee.swapTransaction=void 0,void(ee.fetchError=!0)}}},async createSwapTransaction(){const{networkAddress:e,fromCaipAddress:t,sourceTokenAmount:n}=ie.getParams(),r=ee.sourceToken,s=ee.toToken;if(!(t&&n&&r&&s))return;const c=a.parseUnits(n,r.decimals)?.toString();try{const i=await d.generateSwapCalldata({userAddress:t,from:r.address,to:s.address,amount:c,disableEstimate:!0}),o=r.address===e,a=BigInt(i.tx.eip155.gas),n=BigInt(i.tx.eip155.gasPrice),l=u.getPlainAddress(i.tx.to);if(!l)throw new Error("SwapController:createSwapTransaction - address is required");const p={data:i.tx.data,to:l,gas:a,gasPrice:n,value:o?BigInt(c??"0"):BigInt("0"),toAmount:ee.toTokenAmount};return ee.gasPriceInUSD=X.getGasPriceInUSD(ee.networkPrice,a,n),ee.approvalTransaction=void 0,ee.swapTransaction=p,p}catch(l){return i.goBack(),o.showError("Failed to create transaction"),ee.approvalTransaction=void 0,ee.swapTransaction=void 0,void(ee.fetchError=!0)}},onEmbeddedWalletApprovalSuccess(){o.showLoading("Approve limit increase in your wallet"),i.replace("SwapPreview")},async sendTransactionForApproval(e){const{fromAddress:t,isAuthConnector:d}=ie.getParams();ee.loadingApprovalTransaction=!0;d?i.pushTransactionStack({onSuccess:ie.onEmbeddedWalletApprovalSuccess}):o.showLoading("Approve limit increase in your wallet");try{await a.sendTransaction({address:t,to:e.to,data:e.data,value:e.value,chainNamespace:n.CHAIN.EVM}),await ie.swapTokens(),await ie.getTransaction(),ee.approvalTransaction=void 0,ee.loadingApprovalTransaction=!1}catch(u){const e=u;ee.transactionError=e?.displayMessage,ee.loadingApprovalTransaction=!1,o.showError(e?.displayMessage||"Transaction error"),r.sendEvent({type:"track",event:"SWAP_APPROVAL_ERROR",properties:{message:e?.displayMessage||e?.message||"Unknown",network:l.state.activeCaipNetwork?.caipNetworkId||"",swapFromToken:ie.state.sourceToken?.symbol||"",swapToToken:ie.state.toToken?.symbol||"",swapFromAmount:ie.state.sourceTokenAmount||"",swapToAmount:ie.state.toTokenAmount||"",isSmartAccount:s(n.CHAIN.EVM)===c.ACCOUNT_TYPES.SMART_ACCOUNT}})}},async sendTransactionForSwap(t){if(!t)return;const{fromAddress:d,toTokenAmount:u,isAuthConnector:p}=ie.getParams();ee.loadingTransaction=!0;const h=`Swapping ${ee.sourceToken?.symbol} to ${e.formatNumberToLocalString(u,3)} ${ee.toToken?.symbol}`,m=`Swapped ${ee.sourceToken?.symbol} to ${e.formatNumberToLocalString(u,3)} ${ee.toToken?.symbol}`;p?i.pushTransactionStack({onSuccess(){i.replace("Account"),o.showLoading(h),te.resetState()}}):o.showLoading("Confirm transaction in your wallet");try{const e=[ee.sourceToken?.address,ee.toToken?.address].join(","),u=await a.sendTransaction({address:d,to:t.to,data:t.data,value:t.value,chainNamespace:n.CHAIN.EVM});return ee.loadingTransaction=!1,o.showSuccess(m),r.sendEvent({type:"track",event:"SWAP_SUCCESS",properties:{network:l.state.activeCaipNetwork?.caipNetworkId||"",swapFromToken:ie.state.sourceToken?.symbol||"",swapToToken:ie.state.toToken?.symbol||"",swapFromAmount:ie.state.sourceTokenAmount||"",swapToAmount:ie.state.toTokenAmount||"",isSmartAccount:s(n.CHAIN.EVM)===c.ACCOUNT_TYPES.SMART_ACCOUNT}}),te.resetState(),p||i.replace("Account"),te.getMyTokensWithBalance(e),u}catch(w){const e=w;return ee.transactionError=e?.displayMessage,ee.loadingTransaction=!1,o.showError(e?.displayMessage||"Transaction error"),void r.sendEvent({type:"track",event:"SWAP_ERROR",properties:{message:e?.displayMessage||e?.message||"Unknown",network:l.state.activeCaipNetwork?.caipNetworkId||"",swapFromToken:ie.state.sourceToken?.symbol||"",swapToToken:ie.state.toToken?.symbol||"",swapFromAmount:ie.state.sourceTokenAmount||"",swapToAmount:ie.state.toTokenAmount||"",isSmartAccount:s(n.CHAIN.EVM)===c.ACCOUNT_TYPES.SMART_ACCOUNT}})}},hasInsufficientToken:(e,t)=>X.isInsufficientSourceTokenForSwap(e,t,ee.myTokensWithBalance),setTransactionDetails(){const{toTokenAddress:e,toTokenDecimals:t}=ie.getParams();e&&t&&(ee.gasPriceInUSD=X.getGasPriceInUSD(ee.networkPrice,BigInt(ee.gasFee),BigInt(Z)),ee.priceImpact=X.getPriceImpact({sourceTokenAmount:ee.sourceTokenAmount,sourceTokenPriceInUSD:ee.sourceTokenPriceInUSD,toTokenPriceInUSD:ee.toTokenPriceInUSD,toTokenAmount:ee.toTokenAmount}),ee.maxSlippage=X.getMaxSlippage(ee.slippage,ee.toTokenAmount),ee.providerFee=X.getProviderFee(ee.sourceTokenAmount))}},ie=t(te),oe=G({message:"",open:!1,triggerRect:{width:0,height:0,top:0,left:0},variant:"shade"}),ae=t({state:oe,subscribe:e=>Y(oe,()=>e(oe)),subscribeKey:(e,t)=>f(oe,e,t),showTooltip({message:e,triggerRect:t,variant:i}){oe.open=!0,oe.message=e,oe.triggerRect=t,oe.variant=i},hide(){oe.open=!1,oe.message="",oe.triggerRect={width:0,height:0,top:0,left:0}}}),ne={isUnsupportedChainView:()=>"UnsupportedChain"===i.state.view||"SwitchNetwork"===i.state.view&&i.state.history.includes("UnsupportedChain"),async safeClose(){if(this.isUnsupportedChainView())return void b.shake();await v.isSIWXCloseDisabled()?b.shake():("DataCapture"!==i.state.view&&"DataCaptureOtpConfirm"!==i.state.view||a.disconnect(),b.close())}},re={interpolate(e,t,i){if(2!==e.length||2!==t.length)throw new Error("inputRange and outputRange must be an array of length 2");const o=e[0]||0,a=e[1]||0,n=t[0]||0,r=t[1]||0;return i<o?n:i>a?r:(r-n)/(a-o)*(i-o)+n}},se=k`
  :host {
    display: block;
    border-radius: clamp(0px, ${({borderRadius:e})=>e[8]}, 44px);
    box-shadow: 0 0 0 1px ${({tokens:e})=>e.theme.foregroundPrimary};
    overflow: hidden;
  }
`;var ce=function(e,t,i,o){var a,n=arguments.length,r=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,i,r):a(t,i))||r);return n>3&&r&&Object.defineProperty(t,i,r),r};let le=class extends T{render(){return S`<slot></slot>`}};le.styles=[x,se],le=ce([q("wui-card")],le);const de=k`
  :host {
    width: 100%;
  }

  :host > wui-flex {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${({spacing:e})=>e[2]};
    padding: ${({spacing:e})=>e[3]};
    border-radius: ${({borderRadius:e})=>e[6]};
    border: 1px solid ${({tokens:e})=>e.theme.borderPrimary};
    box-sizing: border-box;
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.25);
    color: ${({tokens:e})=>e.theme.textPrimary};
  }

  :host > wui-flex[data-type='info'] {
    .icon-box {
      background-color: ${({tokens:e})=>e.theme.foregroundSecondary};

      wui-icon {
        color: ${({tokens:e})=>e.theme.iconDefault};
      }
    }
  }
  :host > wui-flex[data-type='success'] {
    .icon-box {
      background-color: ${({tokens:e})=>e.core.backgroundSuccess};

      wui-icon {
        color: ${({tokens:e})=>e.core.borderSuccess};
      }
    }
  }
  :host > wui-flex[data-type='warning'] {
    .icon-box {
      background-color: ${({tokens:e})=>e.core.backgroundWarning};

      wui-icon {
        color: ${({tokens:e})=>e.core.borderWarning};
      }
    }
  }
  :host > wui-flex[data-type='error'] {
    .icon-box {
      background-color: ${({tokens:e})=>e.core.backgroundError};

      wui-icon {
        color: ${({tokens:e})=>e.core.borderError};
      }
    }
  }

  wui-flex {
    width: 100%;
  }

  wui-text {
    word-break: break-word;
    flex: 1;
  }

  .close {
    cursor: pointer;
    color: ${({tokens:e})=>e.theme.iconDefault};
  }

  .icon-box {
    height: 40px;
    width: 40px;
    border-radius: ${({borderRadius:e})=>e[2]};
    background-color: var(--local-icon-bg-value);
  }
`;var ue=function(e,t,i,o){var a,n=arguments.length,r=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,i,r):a(t,i))||r);return n>3&&r&&Object.defineProperty(t,i,r),r};const pe={info:"info",success:"checkmark",warning:"warningCircle",error:"warning"};let he=class extends T{constructor(){super(...arguments),this.message="",this.type="info"}render(){return S`
      <wui-flex
        data-type=${M(this.type)}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        gap="2"
      >
        <wui-flex columnGap="2" flexDirection="row" alignItems="center">
          <wui-flex
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            class="icon-box"
          >
            <wui-icon color="inherit" size="md" name=${pe[this.type]}></wui-icon>
          </wui-flex>
          <wui-text variant="md-medium" color="inherit" data-testid="wui-alertbar-text"
            >${this.message}</wui-text
          >
        </wui-flex>
        <wui-icon
          class="close"
          color="inherit"
          size="sm"
          name="close"
          @click=${this.onClose}
        ></wui-icon>
      </wui-flex>
    `}onClose(){h.close()}};he.styles=[x,de],ue([_()],he.prototype,"message",void 0),ue([_()],he.prototype,"type",void 0),he=ue([q("wui-alertbar")],he);const me=k`
  :host {
    display: block;
    position: absolute;
    top: ${({spacing:e})=>e[3]};
    left: ${({spacing:e})=>e[4]};
    right: ${({spacing:e})=>e[4]};
    opacity: 0;
    pointer-events: none;
  }
`;var we=function(e,t,i,o){var a,n=arguments.length,r=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,i,r):a(t,i))||r);return n>3&&r&&Object.defineProperty(t,i,r),r};const ge={info:{backgroundColor:"fg-350",iconColor:"fg-325",icon:"info"},success:{backgroundColor:"success-glass-reown-020",iconColor:"success-125",icon:"checkmark"},warning:{backgroundColor:"warning-glass-reown-020",iconColor:"warning-100",icon:"warningCircle"},error:{backgroundColor:"error-glass-reown-020",iconColor:"error-125",icon:"warning"}};let ye=class extends T{constructor(){super(),this.unsubscribe=[],this.open=h.state.open,this.onOpen(!0),this.unsubscribe.push(h.subscribeKey("open",e=>{this.open=e,this.onOpen(!1)}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const{message:e,variant:t}=h.state,i=ge[t];return S`
      <wui-alertbar
        message=${e}
        backgroundColor=${i?.backgroundColor}
        iconColor=${i?.iconColor}
        icon=${i?.icon}
        type=${t}
      ></wui-alertbar>
    `}onOpen(e){this.open?(this.animate([{opacity:0,transform:"scale(0.85)"},{opacity:1,transform:"scale(1)"}],{duration:150,fill:"forwards",easing:"ease"}),this.style.cssText="pointer-events: auto"):e||(this.animate([{opacity:1,transform:"scale(1)"},{opacity:0,transform:"scale(0.85)"}],{duration:150,fill:"forwards",easing:"ease"}),this.style.cssText="pointer-events: none")}};ye.styles=me,we([H()],ye.prototype,"open",void 0),ye=we([q("w3m-alertbar")],ye);const fe=k`
  :host {
    position: relative;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    padding: ${({spacing:e})=>e[1]};
  }

  /* -- Colors --------------------------------------------------- */
  button[data-type='accent'] wui-icon {
    color: ${({tokens:e})=>e.core.iconAccentPrimary};
  }

  button[data-type='neutral'][data-variant='primary'] wui-icon {
    color: ${({tokens:e})=>e.theme.iconInverse};
  }

  button[data-type='neutral'][data-variant='secondary'] wui-icon {
    color: ${({tokens:e})=>e.theme.iconDefault};
  }

  button[data-type='success'] wui-icon {
    color: ${({tokens:e})=>e.core.iconSuccess};
  }

  button[data-type='error'] wui-icon {
    color: ${({tokens:e})=>e.core.iconError};
  }

  /* -- Sizes --------------------------------------------------- */
  button[data-size='xs'] {
    width: 16px;
    height: 16px;

    border-radius: ${({borderRadius:e})=>e[1]};
  }

  button[data-size='sm'] {
    width: 20px;
    height: 20px;
    border-radius: ${({borderRadius:e})=>e[1]};
  }

  button[data-size='md'] {
    width: 24px;
    height: 24px;
    border-radius: ${({borderRadius:e})=>e[2]};
  }

  button[data-size='lg'] {
    width: 28px;
    height: 28px;
    border-radius: ${({borderRadius:e})=>e[2]};
  }

  button[data-size='xs'] wui-icon {
    width: 8px;
    height: 8px;
  }

  button[data-size='sm'] wui-icon {
    width: 12px;
    height: 12px;
  }

  button[data-size='md'] wui-icon {
    width: 16px;
    height: 16px;
  }

  button[data-size='lg'] wui-icon {
    width: 20px;
    height: 20px;
  }

  /* -- Hover --------------------------------------------------- */
  @media (hover: hover) {
    button[data-type='accent']:hover:enabled {
      background-color: ${({tokens:e})=>e.core.foregroundAccent010};
    }

    button[data-variant='primary'][data-type='neutral']:hover:enabled {
      background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
    }

    button[data-variant='secondary'][data-type='neutral']:hover:enabled {
      background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
    }

    button[data-type='success']:hover:enabled {
      background-color: ${({tokens:e})=>e.core.backgroundSuccess};
    }

    button[data-type='error']:hover:enabled {
      background-color: ${({tokens:e})=>e.core.backgroundError};
    }
  }

  /* -- Focus --------------------------------------------------- */
  button:focus-visible {
    box-shadow: 0 0 0 4px ${({tokens:e})=>e.core.foregroundAccent020};
  }

  /* -- Properties --------------------------------------------------- */
  button[data-full-width='true'] {
    width: 100%;
  }

  :host([fullWidth]) {
    width: 100%;
  }

  button[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;var be=function(e,t,i,o){var a,n=arguments.length,r=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,i,r):a(t,i))||r);return n>3&&r&&Object.defineProperty(t,i,r),r};let ve=class extends T{constructor(){super(...arguments),this.icon="card",this.variant="primary",this.type="accent",this.size="md",this.iconSize=void 0,this.fullWidth=!1,this.disabled=!1}render(){return S`<button
      data-variant=${this.variant}
      data-type=${this.type}
      data-size=${this.size}
      data-full-width=${this.fullWidth}
      ?disabled=${this.disabled}
    >
      <wui-icon color="inherit" name=${this.icon} size=${M(this.iconSize)}></wui-icon>
    </button>`}};ve.styles=[x,A,fe],be([_()],ve.prototype,"icon",void 0),be([_()],ve.prototype,"variant",void 0),be([_()],ve.prototype,"type",void 0),be([_()],ve.prototype,"size",void 0),be([_()],ve.prototype,"iconSize",void 0),be([_({type:Boolean})],ve.prototype,"fullWidth",void 0),be([_({type:Boolean})],ve.prototype,"disabled",void 0),ve=be([q("wui-icon-button")],ve);const ke=k`
  button {
    display: block;
    display: flex;
    align-items: center;
    padding: ${({spacing:e})=>e[1]};
    transition: background-color ${({durations:e})=>e.lg}
      ${({easings:e})=>e["ease-out-power-2"]};
    will-change: background-color;
    border-radius: ${({borderRadius:e})=>e[32]};
  }

  wui-image {
    border-radius: 100%;
  }

  wui-text {
    padding-left: ${({spacing:e})=>e[1]};
  }

  .left-icon-container,
  .right-icon-container {
    width: 24px;
    height: 24px;
    justify-content: center;
    align-items: center;
  }

  wui-icon {
    color: ${({tokens:e})=>e.theme.iconDefault};
  }

  /* -- Sizes --------------------------------------------------- */
  button[data-size='lg'] {
    height: 32px;
  }

  button[data-size='md'] {
    height: 28px;
  }

  button[data-size='sm'] {
    height: 24px;
  }

  button[data-size='lg'] wui-image {
    width: 24px;
    height: 24px;
  }

  button[data-size='md'] wui-image {
    width: 20px;
    height: 20px;
  }

  button[data-size='sm'] wui-image {
    width: 16px;
    height: 16px;
  }

  button[data-size='lg'] .left-icon-container {
    width: 24px;
    height: 24px;
  }

  button[data-size='md'] .left-icon-container {
    width: 20px;
    height: 20px;
  }

  button[data-size='sm'] .left-icon-container {
    width: 16px;
    height: 16px;
  }

  /* -- Variants --------------------------------------------------------- */
  button[data-type='filled-dropdown'] {
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
  }

  button[data-type='text-dropdown'] {
    background-color: transparent;
  }

  /* -- Focus states --------------------------------------------------- */
  button:focus-visible:enabled {
    background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
    box-shadow: 0 0 0 4px ${({tokens:e})=>e.core.foregroundAccent040};
  }

  /* -- Hover & Active states ----------------------------------------------------------- */
  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled,
    button:active:enabled {
      background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
    }
  }

  /* -- Disabled states --------------------------------------------------- */
  button:disabled {
    background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
    opacity: 0.5;
  }
`;var xe=function(e,t,i,o){var a,n=arguments.length,r=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,i,r):a(t,i))||r);return n>3&&r&&Object.defineProperty(t,i,r),r};const Te={lg:"lg-regular",md:"md-regular",sm:"sm-regular"},Se={lg:"lg",md:"md",sm:"sm"};let Ae=class extends T{constructor(){super(...arguments),this.imageSrc="",this.text="",this.size="lg",this.type="text-dropdown",this.disabled=!1}render(){return S`<button ?disabled=${this.disabled} data-size=${this.size} data-type=${this.type}>
      ${this.imageTemplate()} ${this.textTemplate()}
      <wui-flex class="right-icon-container">
        <wui-icon name="chevronBottom"></wui-icon>
      </wui-flex>
    </button>`}textTemplate(){const e=Te[this.size];return this.text?S`<wui-text color="primary" variant=${e}>${this.text}</wui-text>`:null}imageTemplate(){if(this.imageSrc)return S`<wui-image src=${this.imageSrc} alt="select visual"></wui-image>`;const e=Se[this.size];return S` <wui-flex class="left-icon-container">
      <wui-icon size=${e} name="networkPlaceholder"></wui-icon>
    </wui-flex>`}};Ae.styles=[x,A,ke],xe([_()],Ae.prototype,"imageSrc",void 0),xe([_()],Ae.prototype,"text",void 0),xe([_()],Ae.prototype,"size",void 0),xe([_()],Ae.prototype,"type",void 0),xe([_({type:Boolean})],Ae.prototype,"disabled",void 0),Ae=xe([q("wui-select")],Ae);const $e={ACCOUNT_TABS:[{label:"Tokens"},{label:"Activity"}],VIEW_DIRECTION:{Next:"next",Prev:"prev"},ANIMATION_DURATIONS:{HeaderText:120},VIEWS_WITH_LEGAL_FOOTER:["Connect","ConnectWallets","OnRampTokenSelect","OnRampFiatSelect","OnRampProviders"],VIEWS_WITH_DEFAULT_FOOTER:["Networks"]},Pe=k`
  button {
    background-color: transparent;
    padding: ${({spacing:e})=>e[1]};
  }

  button:focus-visible {
    box-shadow: 0 0 0 4px ${({tokens:e})=>e.core.foregroundAccent020};
  }

  button[data-variant='accent']:hover:enabled,
  button[data-variant='accent']:focus-visible {
    background-color: ${({tokens:e})=>e.core.foregroundAccent010};
  }

  button[data-variant='primary']:hover:enabled,
  button[data-variant='primary']:focus-visible,
  button[data-variant='secondary']:hover:enabled,
  button[data-variant='secondary']:focus-visible {
    background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
  }

  button[data-size='xs'] > wui-icon {
    width: 8px;
    height: 8px;
  }

  button[data-size='sm'] > wui-icon {
    width: 12px;
    height: 12px;
  }

  button[data-size='xs'],
  button[data-size='sm'] {
    border-radius: ${({borderRadius:e})=>e[1]};
  }

  button[data-size='md'],
  button[data-size='lg'] {
    border-radius: ${({borderRadius:e})=>e[2]};
  }

  button[data-size='md'] > wui-icon {
    width: 16px;
    height: 16px;
  }

  button[data-size='lg'] > wui-icon {
    width: 20px;
    height: 20px;
  }

  button:disabled {
    background-color: transparent;
    cursor: not-allowed;
    opacity: 0.5;
  }

  button:hover:not(:disabled) {
    background-color: var(--wui-color-accent-glass-015);
  }

  button:focus-visible:not(:disabled) {
    background-color: var(--wui-color-accent-glass-015);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0 0 0 4px var(--wui-color-accent-glass-020);
  }
`;var Ce=function(e,t,i,o){var a,n=arguments.length,r=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,i,r):a(t,i))||r);return n>3&&r&&Object.defineProperty(t,i,r),r};let Ie=class extends T{constructor(){super(...arguments),this.size="md",this.disabled=!1,this.icon="copy",this.iconColor="default",this.variant="accent"}render(){return S`
      <button data-variant=${this.variant} ?disabled=${this.disabled} data-size=${this.size}>
        <wui-icon
          color=${{accent:"accent-primary",primary:"inverse",secondary:"default"}[this.variant]||this.iconColor}
          size=${this.size}
          name=${this.icon}
        ></wui-icon>
      </button>
    `}};Ie.styles=[x,A,Pe],Ce([_()],Ie.prototype,"size",void 0),Ce([_({type:Boolean})],Ie.prototype,"disabled",void 0),Ce([_()],Ie.prototype,"icon",void 0),Ce([_()],Ie.prototype,"iconColor",void 0),Ce([_()],Ie.prototype,"variant",void 0),Ie=Ce([q("wui-icon-link")],Ie);const Ee=$`<svg width="86" height="96" fill="none">
  <path
    d="M78.3244 18.926L50.1808 2.45078C45.7376 -0.150261 40.2624 -0.150262 35.8192 2.45078L7.6756 18.926C3.23322 21.5266 0.5 26.3301 0.5 31.5248V64.4752C0.5 69.6699 3.23322 74.4734 7.6756 77.074L35.8192 93.5492C40.2624 96.1503 45.7376 96.1503 50.1808 93.5492L78.3244 77.074C82.7668 74.4734 85.5 69.6699 85.5 64.4752V31.5248C85.5 26.3301 82.7668 21.5266 78.3244 18.926Z"
  />
</svg>`,Ne=$`
  <svg fill="none" viewBox="0 0 36 40">
    <path
      d="M15.4 2.1a5.21 5.21 0 0 1 5.2 0l11.61 6.7a5.21 5.21 0 0 1 2.61 4.52v13.4c0 1.87-1 3.59-2.6 4.52l-11.61 6.7c-1.62.93-3.6.93-5.22 0l-11.6-6.7a5.21 5.21 0 0 1-2.61-4.51v-13.4c0-1.87 1-3.6 2.6-4.52L15.4 2.1Z"
    />
  </svg>
`,Re=k`
  :host {
    position: relative;
    border-radius: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--local-width);
    height: var(--local-height);
  }

  :host([data-round='true']) {
    background: ${({tokens:e})=>e.theme.foregroundPrimary};
    border-radius: 100%;
    outline: 1px solid ${({tokens:e})=>e.core.glass010};
  }

  svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  svg > path {
    stroke: var(--local-stroke);
  }

  wui-image {
    width: 100%;
    height: 100%;
    -webkit-clip-path: var(--local-path);
    clip-path: var(--local-path);
    background: ${({tokens:e})=>e.theme.foregroundPrimary};
  }

  wui-icon {
    transform: translateY(-5%);
    width: var(--local-icon-size);
    height: var(--local-icon-size);
  }
`;var Oe=function(e,t,i,o){var a,n=arguments.length,r=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,i,r):a(t,i))||r);return n>3&&r&&Object.defineProperty(t,i,r),r};let ze=class extends T{constructor(){super(...arguments),this.size="md",this.name="uknown",this.networkImagesBySize={sm:Ne,md:V,lg:Ee},this.selected=!1,this.round=!1}render(){const e={sm:"4",md:"6",lg:"10"};return this.round?(this.dataset.round="true",this.style.cssText="\n      --local-width: var(--apkt-spacing-10);\n      --local-height: var(--apkt-spacing-10);\n      --local-icon-size: var(--apkt-spacing-4);\n    "):this.style.cssText=`\n\n      --local-path: var(--apkt-path-network-${this.size});\n      --local-width:  var(--apkt-width-network-${this.size});\n      --local-height:  var(--apkt-height-network-${this.size});\n      --local-icon-size:  var(--apkt-spacing-${e[this.size]});\n    `,S`${this.templateVisual()} ${this.svgTemplate()} `}svgTemplate(){return this.round?null:this.networkImagesBySize[this.size]}templateVisual(){return this.imageSrc?S`<wui-image src=${this.imageSrc} alt=${this.name}></wui-image>`:S`<wui-icon size="inherit" color="default" name="networkPlaceholder"></wui-icon>`}};ze.styles=[x,Re],Oe([_()],ze.prototype,"size",void 0),Oe([_()],ze.prototype,"name",void 0),Oe([_({type:Object})],ze.prototype,"networkImagesBySize",void 0),Oe([_()],ze.prototype,"imageSrc",void 0),Oe([_({type:Boolean})],ze.prototype,"selected",void 0),Oe([_({type:Boolean})],ze.prototype,"round",void 0),ze=Oe([q("wui-network-image")],ze);const De=k`
  :host {
    position: relative;
    display: flex;
    width: 100%;
    height: 1px;
    background-color: ${({tokens:e})=>e.theme.borderPrimary};
    justify-content: center;
    align-items: center;
  }

  :host > wui-text {
    position: absolute;
    padding: 0px 8px;
    transition: background-color ${({durations:e})=>e.lg}
      ${({easings:e})=>e["ease-out-power-2"]};
    will-change: background-color;
  }

  :host([data-bg-color='primary']) > wui-text {
    background-color: ${({tokens:e})=>e.theme.backgroundPrimary};
  }

  :host([data-bg-color='secondary']) > wui-text {
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
  }
`;var Ue=function(e,t,i,o){var a,n=arguments.length,r=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,i,r):a(t,i))||r);return n>3&&r&&Object.defineProperty(t,i,r),r};let We=class extends T{constructor(){super(...arguments),this.text="",this.bgColor="primary"}render(){return this.dataset.bgColor=this.bgColor,S`${this.template()}`}template(){return this.text?S`<wui-text variant="md-regular" color="secondary">${this.text}</wui-text>`:null}};We.styles=[x,De],Ue([_()],We.prototype,"text",void 0),Ue([_()],We.prototype,"bgColor",void 0),We=Ue([q("wui-separator")],We);const je="INVALID_PAYMENT_CONFIG",Be="INVALID_RECIPIENT",Fe="INVALID_ASSET",Le="INVALID_AMOUNT",qe="UNKNOWN_ERROR",_e="UNABLE_TO_INITIATE_PAYMENT",Me="INVALID_CHAIN_NAMESPACE",He="GENERIC_PAYMENT_ERROR",Ve="UNABLE_TO_GET_EXCHANGES",Ke="ASSET_NOT_SUPPORTED",Qe="UNABLE_TO_GET_PAY_URL",Ge="UNABLE_TO_GET_BUY_STATUS",Ye="UNABLE_TO_GET_TOKEN_BALANCES",Xe="UNABLE_TO_GET_QUOTE",Ze="UNABLE_TO_GET_QUOTE_STATUS",Je="INVALID_RECIPIENT_ADDRESS_FOR_ASSET",et={[je]:"Invalid payment configuration",[Be]:"Invalid recipient address",[Fe]:"Invalid asset specified",[Le]:"Invalid payment amount",[Je]:"Invalid recipient address for the asset selected",[qe]:"Unknown payment error occurred",[_e]:"Unable to initiate payment",[Me]:"Invalid chain namespace",[He]:"Unable to process payment",[Ve]:"Unable to get exchanges",[Ke]:"Asset not supported by the selected exchange",[Qe]:"Unable to get payment URL",[Ge]:"Unable to get buy status",[Ye]:"Unable to get token balances",[Xe]:"Unable to get quote. Please choose a different token",[Ze]:"Unable to get quote status"};class tt extends Error{get message(){return et[this.code]}constructor(e,t){super(et[e]),this.name="AppKitPayError",this.code=e,this.details=t,Error.captureStackTrace&&Error.captureStackTrace(this,tt)}}const it="reown_test";function ot(e){if(!e)return null;const t=e.steps[0];return t&&t.type===ft?t:null}function at(e,t=0){if(!e)return[];const i=e.steps.filter(e=>e.type===bt),o=i.filter((e,i)=>i+1>t);return i.length>0&&i.length<3?o:[]}const nt=new E({baseUrl:u.getApiUrl(),clientId:null});class rt extends Error{}function st(){const{projectId:e,sdkType:t,sdkVersion:i}=R.state;return{projectId:e,st:t||"appkit",sv:i||"html-wagmi-4.2.2"}}async function ct(e,t){const i=`https://rpc.walletconnect.org/v1/json-rpc?projectId=${R.getSnapshot().projectId}`,{sdkType:o,sdkVersion:a,projectId:n}=R.getSnapshot(),r={jsonrpc:"2.0",id:1,method:e,params:{...t||{},st:o,sv:a,projectId:n}},s=await fetch(i,{method:"POST",body:JSON.stringify(r),headers:{"Content-Type":"application/json"}}),c=await s.json();if(c.error)throw new rt(c.error.message);return c}async function lt(e){return(await ct("reown_getExchanges",e)).result}async function dt(e){return(await ct("reown_getExchangePayUrl",e)).result}async function ut(t){const i=N.isLowerCaseMatch(t.sourceToken.network,t.toToken.network),o=N.isLowerCaseMatch(t.sourceToken.asset,t.toToken.asset);return i&&o?async function({sourceToken:e,toToken:t,amount:i,recipient:o}){const n=a.parseUnits(i,e.metadata.decimals),r=a.parseUnits(i,t.metadata.decimals);return Promise.resolve({type:yt,origin:{amount:n?.toString()??"0",currency:e},destination:{amount:r?.toString()??"0",currency:t},fees:[{id:"service",label:"Service Fee",amount:"0",currency:t}],steps:[{requestId:yt,type:"deposit",deposit:{amount:n?.toString()??"0",currency:e.asset,receiver:o}}],timeInSeconds:6})}(t):async function(t){const i=e.bigNumber(t.amount).times(10**t.toToken.metadata.decimals).toString(),{chainId:o,chainNamespace:a}=I.parseCaipNetworkId(t.sourceToken.network),{chainId:n,chainNamespace:r}=I.parseCaipNetworkId(t.toToken.network),s="native"===t.sourceToken.asset?O(a):t.sourceToken.asset,c="native"===t.toToken.asset?O(r):t.toToken.asset;return await nt.post({path:"/appkit/v1/transfers/quote",body:{user:t.address,originChainId:o.toString(),originCurrency:s,destinationChainId:n.toString(),destinationCurrency:c,recipient:t.recipient,amount:i},params:st()})}(t)}const pt=["eip155","solana"],ht={eip155:{native:{assetNamespace:"slip44",assetReference:"60"},defaultTokenNamespace:"erc20"},solana:{native:{assetNamespace:"slip44",assetReference:"501"},defaultTokenNamespace:"token"}};function mt(e,t){const{chainNamespace:i,chainId:o}=I.parseCaipNetworkId(e),a=ht[i];if(!a)throw new Error(`Unsupported chain namespace for CAIP-19 formatting: ${i}`);let n=a.native.assetNamespace,r=a.native.assetReference;"native"!==t&&(n=a.defaultTokenNamespace,r=t);return`${`${i}:${o}`}/${n}:${r}`}function wt(t){const i=e.bigNumber(t,{safe:!0});return i.lt(.001)?"<0.001":i.round(4).toString()}const gt="unknown",yt="direct-transfer",ft="deposit",bt="transaction",vt=G({paymentAsset:{network:"eip155:1",asset:"0x0",metadata:{name:"0x0",symbol:"0x0",decimals:0}},recipient:"0x0",amount:0,isConfigured:!1,error:null,isPaymentInProgress:!1,exchanges:[],isLoading:!1,openInNewTab:!0,redirectUrl:void 0,payWithExchange:void 0,currentPayment:void 0,analyticsSet:!1,paymentId:void 0,choice:"pay",tokenBalances:{[n.CHAIN.EVM]:[],[n.CHAIN.SOLANA]:[]},isFetchingTokenBalances:!1,selectedPaymentAsset:null,quote:void 0,quoteStatus:"waiting",quoteError:null,isFetchingQuote:!1,selectedExchange:void 0,exchangeUrlForQuote:void 0,requestId:void 0}),kt={state:vt,subscribe:e=>Y(vt,()=>e(vt)),subscribeKey:(e,t)=>f(vt,e,t),async handleOpenPay(e){this.resetState(),this.setPaymentConfig(e),this.initializeAnalytics(),function(){const{chainNamespace:e}=I.parseCaipNetworkId(kt.state.paymentAsset.network);if(!u.isAddress(kt.state.recipient,e))throw new tt(Je,`Provide valid recipient address for namespace "${e}"`)}(),await this.prepareTokenLogo(),vt.isConfigured=!0,r.sendEvent({type:"track",event:"PAY_MODAL_OPEN",properties:{exchanges:vt.exchanges,configuration:{network:vt.paymentAsset.network,asset:vt.paymentAsset.asset,recipient:vt.recipient,amount:vt.amount}}}),await b.open({view:"Pay"})},resetState(){vt.paymentAsset={network:"eip155:1",asset:"0x0",metadata:{name:"0x0",symbol:"0x0",decimals:0}},vt.recipient="0x0",vt.amount=0,vt.isConfigured=!1,vt.error=null,vt.isPaymentInProgress=!1,vt.isLoading=!1,vt.currentPayment=void 0,vt.selectedExchange=void 0,vt.exchangeUrlForQuote=void 0,vt.requestId=void 0},resetQuoteState(){vt.quote=void 0,vt.quoteStatus="waiting",vt.quoteError=null,vt.isFetchingQuote=!1,vt.requestId=void 0},setPaymentConfig(e){if(!e.paymentAsset)throw new tt(je);try{vt.choice=e.choice??"pay",vt.paymentAsset=e.paymentAsset,vt.recipient=e.recipient,vt.amount=e.amount,vt.openInNewTab=e.openInNewTab??!0,vt.redirectUrl=e.redirectUrl,vt.payWithExchange=e.payWithExchange,vt.error=null}catch(t){throw new tt(je,t.message)}},setSelectedPaymentAsset(e){vt.selectedPaymentAsset=e},setSelectedExchange(e){vt.selectedExchange=e},setRequestId(e){vt.requestId=e},setPaymentInProgress(e){vt.isPaymentInProgress=e},getPaymentAsset:()=>vt.paymentAsset,getExchanges:()=>vt.exchanges,async fetchExchanges(){try{vt.isLoading=!0;const e=await lt({page:0});vt.exchanges=e.exchanges.slice(0,2)}catch(e){throw o.showError(et.UNABLE_TO_GET_EXCHANGES),new tt(Ve)}finally{vt.isLoading=!1}},async getAvailableExchanges(e){try{const t=e?.asset&&e?.network?mt(e.network,e.asset):void 0;return await lt({page:e?.page??0,asset:t,amount:e?.amount?.toString()})}catch(t){throw new tt(Ve)}},async getPayUrl(e,t,i=!1){try{const o=Number(t.amount),a=await dt({exchangeId:e,asset:mt(t.network,t.asset),amount:o.toString(),recipient:`${t.network}:${t.recipient}`});return r.sendEvent({type:"track",event:"PAY_EXCHANGE_SELECTED",properties:{source:"pay",exchange:{id:e},configuration:{network:t.network,asset:t.asset,recipient:t.recipient,amount:o},currentPayment:{type:"exchange",exchangeId:e},headless:i}}),i&&(this.initiatePayment(),r.sendEvent({type:"track",event:"PAY_INITIATED",properties:{source:"pay",paymentId:vt.paymentId||gt,configuration:{network:t.network,asset:t.asset,recipient:t.recipient,amount:o},currentPayment:{type:"exchange",exchangeId:e}}})),a}catch(o){if(o instanceof Error&&o.message.includes("is not supported"))throw new tt(Ke);throw new Error(o.message)}},async generateExchangeUrlForQuote({exchangeId:e,paymentAsset:t,amount:i,recipient:o}){const a=await dt({exchangeId:e,asset:mt(t.network,t.asset),amount:i.toString(),recipient:o});vt.exchangeSessionId=a.sessionId,vt.exchangeUrlForQuote=a.url},async openPayUrl(e,t,i=!1){try{const o=await this.getPayUrl(e.exchangeId,t,i);if(!o)throw new tt(Qe);const a=e.openInNewTab??!0?"_blank":"_self";return u.openHref(o.url,a),o}catch(o){throw vt.error=o instanceof tt?o.message:et.GENERIC_PAYMENT_ERROR,new tt(Qe)}},async onTransfer({chainNamespace:e,fromAddress:t,toAddress:i,amount:r,paymentAsset:s}){if(vt.currentPayment={type:"wallet",status:"IN_PROGRESS"},!vt.isPaymentInProgress)try{this.initiatePayment();const o=l.getAllRequestedCaipNetworks().find(e=>e.caipNetworkId===s.network);if(!o)throw new Error("Target network not found");const c=l.state.activeCaipNetwork;switch(N.isLowerCaseMatch(c?.caipNetworkId,o.caipNetworkId)||await l.switchActiveNetwork(o),e){case n.CHAIN.EVM:"native"===s.asset&&(vt.currentPayment.result=await async function(e,t,i){if(t!==n.CHAIN.EVM)throw new tt(Me);if(!i.fromAddress)throw new tt(je,"fromAddress is required for native EVM payments.");const o="string"==typeof i.amount?parseFloat(i.amount):i.amount;if(isNaN(o))throw new tt(je);const r=e.metadata?.decimals??18,s=a.parseUnits(o.toString(),r);if("bigint"!=typeof s)throw new tt(He);return await a.sendTransaction({chainNamespace:t,to:i.recipient,address:i.fromAddress,value:s,data:"0x"})??void 0}(s,e,{recipient:i,amount:r,fromAddress:t})),s.asset.startsWith("0x")&&(vt.currentPayment.result=await async function(e,t){if(!t.fromAddress)throw new tt(je,"fromAddress is required for ERC20 EVM payments.");const i=e.asset,o=t.recipient,r=Number(e.metadata.decimals),s=a.parseUnits(t.amount.toString(),r);if(void 0===s)throw new tt(He);return await a.writeContract({fromAddress:t.fromAddress,tokenAddress:i,args:[o,s],method:"transfer",abi:C.getERC20Abi(i),chainNamespace:n.CHAIN.EVM})??void 0}(s,{recipient:i,amount:r,fromAddress:t})),vt.currentPayment.status="SUCCESS";break;case n.CHAIN.SOLANA:vt.currentPayment.result=await async function(e,t){if(e!==n.CHAIN.SOLANA)throw new tt(Me);if(!t.fromAddress)throw new tt(je,"fromAddress is required for Solana payments.");const i="string"==typeof t.amount?parseFloat(t.amount):t.amount;if(isNaN(i)||i<=0)throw new tt(je,"Invalid payment amount.");try{if(!P.getProvider(e))throw new tt(He,"No Solana provider available.");const o=await a.sendTransaction({chainNamespace:n.CHAIN.SOLANA,to:t.recipient,value:i,tokenMint:t.tokenMint});if(!o)throw new tt(He,"Transaction failed.");return o}catch(o){if(o instanceof tt)throw o;throw new tt(He,`Solana payment failed: ${o}`)}}(e,{recipient:i,amount:r,fromAddress:t,tokenMint:"native"===s.asset?void 0:s.asset}),vt.currentPayment.status="SUCCESS";break;default:throw new tt(Me)}}catch(c){throw vt.error=c instanceof tt?c.message:et.GENERIC_PAYMENT_ERROR,vt.currentPayment.status="FAILED",o.showError(vt.error),c}finally{vt.isPaymentInProgress=!1}},async onSendTransaction(e){try{const{namespace:t,transactionStep:i}=e;kt.initiatePayment();const o=l.getAllRequestedCaipNetworks().find(e=>e.caipNetworkId===vt.paymentAsset?.network);if(!o)throw new Error("Target network not found");const r=l.state.activeCaipNetwork;if(N.isLowerCaseMatch(r?.caipNetworkId,o.caipNetworkId)||await l.switchActiveNetwork(o),t===n.CHAIN.EVM){const{from:e,to:o,data:n,value:r}=i.transaction;await a.sendTransaction({address:e,to:o,data:n,value:BigInt(r),chainNamespace:t})}else if(t===n.CHAIN.SOLANA){const{instructions:e}=i.transaction;await a.writeSolanaTransaction({instructions:e})}}catch(t){throw vt.error=t instanceof tt?t.message:et.GENERIC_PAYMENT_ERROR,o.showError(vt.error),t}finally{vt.isPaymentInProgress=!1}},getExchangeById:e=>vt.exchanges.find(t=>t.id===e),validatePayConfig(e){const{paymentAsset:t,recipient:i,amount:o}=e;if(!t)throw new tt(je);if(!i)throw new tt(Be);if(!t.asset)throw new tt(Fe);if(null==o||o<=0)throw new tt(Le)},async handlePayWithExchange(e){try{vt.currentPayment={type:"exchange",exchangeId:e};const{network:t,asset:i}=vt.paymentAsset,o={network:t,asset:i,amount:vt.amount,recipient:vt.recipient},a=await this.getPayUrl(e,o);if(!a)throw new tt(_e);return vt.currentPayment.sessionId=a.sessionId,vt.currentPayment.status="IN_PROGRESS",vt.currentPayment.exchangeId=e,this.initiatePayment(),{url:a.url,openInNewTab:vt.openInNewTab}}catch(t){return vt.error=t instanceof tt?t.message:et.GENERIC_PAYMENT_ERROR,vt.isPaymentInProgress=!1,o.showError(vt.error),null}},async getBuyStatus(e,t){try{const i=await async function(e){return(await ct("reown_getExchangeBuyStatus",e)).result}({sessionId:t,exchangeId:e});return"SUCCESS"!==i.status&&"FAILED"!==i.status||r.sendEvent({type:"track",event:"SUCCESS"===i.status?"PAY_SUCCESS":"PAY_ERROR",properties:{message:"FAILED"===i.status?u.parseError(vt.error):void 0,source:"pay",paymentId:vt.paymentId||gt,configuration:{network:vt.paymentAsset.network,asset:vt.paymentAsset.asset,recipient:vt.recipient,amount:vt.amount},currentPayment:{type:"exchange",exchangeId:vt.currentPayment?.exchangeId,sessionId:vt.currentPayment?.sessionId,result:i.txHash}}}),i}catch(i){throw new tt(Ge)}},async fetchTokensFromEOA({caipAddress:e,caipNetwork:t,namespace:i}){if(!e)return[];const{address:o}=I.parseCaipAddress(e);let a=t;i===n.CHAIN.EVM&&(a=void 0);return await m.getMyTokensWithBalance({address:o,caipNetwork:a})},async fetchTokensFromExchange(){if(!vt.selectedExchange)return[];const e=await async function(e){return await nt.get({path:`/appkit/v1/transfers/assets/exchanges/${e}`,params:st()})}(vt.selectedExchange.id),t=Object.values(e.assets).flat();return await Promise.all(t.map(async e=>{const t={chainId:(i=e).network,address:`${i.network}:${i.asset}`,symbol:i.metadata.symbol,name:i.metadata.name,iconUrl:i.metadata.logoURI||"",price:0,quantity:{numeric:"0",decimals:i.metadata.decimals.toString()}};var i;const{chainNamespace:o}=I.parseCaipNetworkId(t.chainId);let a=t.address;if(u.isCaipAddress(a)){const{address:e}=I.parseCaipAddress(a);a=e}const n=await z.getImageByToken(a??"",o).catch(()=>{});return t.iconUrl=n??"",t}))},async fetchTokens({caipAddress:e,caipNetwork:t,namespace:i}){try{vt.isFetchingTokenBalances=!0;const o=Boolean(vt.selectedExchange)?this.fetchTokensFromExchange():this.fetchTokensFromEOA({caipAddress:e,caipNetwork:t,namespace:i}),a=await o;vt.tokenBalances={...vt.tokenBalances,[i]:a}}catch(a){const e=a instanceof Error?a.message:"Unable to get token balances";o.showError(e)}finally{vt.isFetchingTokenBalances=!1}},async fetchQuote({amount:t,address:i,sourceToken:a,toToken:n,recipient:r}){try{kt.resetQuoteState(),vt.isFetchingQuote=!0;const o=await ut({amount:t,address:vt.selectedExchange?void 0:i,sourceToken:a,toToken:n,recipient:r});if(vt.selectedExchange){const t=ot(o);if(t){const i=`${a.network}:${t.deposit.receiver}`,o=e.formatNumber(t.deposit.amount,{decimals:a.metadata.decimals??0,round:8});await kt.generateExchangeUrlForQuote({exchangeId:vt.selectedExchange.id,paymentAsset:a,amount:o.toString(),recipient:i})}}vt.quote=o}catch(s){let e=et.UNABLE_TO_GET_QUOTE;if(s instanceof Error&&s.cause&&s.cause instanceof Response)try{const t=await s.cause.json();t.error&&"string"==typeof t.error&&(e=t.error)}catch{}throw vt.quoteError=e,o.showError(e),new tt(Xe)}finally{vt.isFetchingQuote=!1}},async fetchQuoteStatus({requestId:e}){try{if(e===yt){const e=vt.selectedExchange,t=vt.exchangeSessionId;if(e&&t){switch((await this.getBuyStatus(e.id,t)).status){case"IN_PROGRESS":case"UNKNOWN":default:vt.quoteStatus="waiting";break;case"SUCCESS":vt.quoteStatus="success",vt.isPaymentInProgress=!1;break;case"FAILED":vt.quoteStatus="failure",vt.isPaymentInProgress=!1}return}return void(vt.quoteStatus="success")}const{status:t}=await async function(e){return await nt.get({path:"/appkit/v1/transfers/status",params:{requestId:e.requestId,...st()}})}({requestId:e});vt.quoteStatus=t}catch{throw vt.quoteStatus="failure",new tt(Ze)}},initiatePayment(){vt.isPaymentInProgress=!0,vt.paymentId=crypto.randomUUID()},initializeAnalytics(){vt.analyticsSet||(vt.analyticsSet=!0,this.subscribeKey("isPaymentInProgress",e=>{if(vt.currentPayment?.status&&"UNKNOWN"!==vt.currentPayment.status){const e={IN_PROGRESS:"PAY_INITIATED",SUCCESS:"PAY_SUCCESS",FAILED:"PAY_ERROR"}[vt.currentPayment.status];r.sendEvent({type:"track",event:e,properties:{message:"FAILED"===vt.currentPayment.status?u.parseError(vt.error):void 0,source:"pay",paymentId:vt.paymentId||gt,configuration:{network:vt.paymentAsset.network,asset:vt.paymentAsset.asset,recipient:vt.recipient,amount:vt.amount},currentPayment:{type:vt.currentPayment.type,exchangeId:vt.currentPayment.exchangeId,sessionId:vt.currentPayment.sessionId,result:vt.currentPayment.result}}})}}))},async prepareTokenLogo(){if(!vt.paymentAsset.metadata.logoURI)try{const{chainNamespace:e}=I.parseCaipNetworkId(vt.paymentAsset.network),t=await z.getImageByToken(vt.paymentAsset.asset,e);vt.paymentAsset.metadata.logoURI=t}catch{}}},xt=k`
  wui-separator {
    margin: var(--apkt-spacing-3) calc(var(--apkt-spacing-3) * -1) var(--apkt-spacing-2)
      calc(var(--apkt-spacing-3) * -1);
    width: calc(100% + var(--apkt-spacing-3) * 2);
  }

  .token-display {
    padding: var(--apkt-spacing-3) var(--apkt-spacing-3);
    border-radius: var(--apkt-borderRadius-5);
    background-color: var(--apkt-tokens-theme-backgroundPrimary);
    margin-top: var(--apkt-spacing-3);
    margin-bottom: var(--apkt-spacing-3);
  }

  .token-display wui-text {
    text-transform: none;
  }

  wui-loading-spinner {
    padding: var(--apkt-spacing-2);
  }

  .left-image-container {
    position: relative;
    justify-content: center;
    align-items: center;
  }

  .token-image {
    border-radius: ${({borderRadius:e})=>e.round};
    width: 40px;
    height: 40px;
  }

  .chain-image {
    position: absolute;
    width: 20px;
    height: 20px;
    bottom: -3px;
    right: -5px;
    border-radius: ${({borderRadius:e})=>e.round};
    border: 2px solid ${({tokens:e})=>e.theme.backgroundPrimary};
  }

  .payment-methods-container {
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    border-top-right-radius: ${({borderRadius:e})=>e[8]};
    border-top-left-radius: ${({borderRadius:e})=>e[8]};
  }
`;var Tt=function(e,t,i,o){var a,n=arguments.length,r=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,i,r):a(t,i))||r);return n>3&&r&&Object.defineProperty(t,i,r),r};let St=class extends T{constructor(){super(),this.unsubscribe=[],this.amount=kt.state.amount,this.namespace=void 0,this.paymentAsset=kt.state.paymentAsset,this.activeConnectorIds=y.state.activeConnectorIds,this.caipAddress=void 0,this.exchanges=kt.state.exchanges,this.isLoading=kt.state.isLoading,this.initializeNamespace(),this.unsubscribe.push(kt.subscribeKey("amount",e=>this.amount=e)),this.unsubscribe.push(y.subscribeKey("activeConnectorIds",e=>this.activeConnectorIds=e)),this.unsubscribe.push(kt.subscribeKey("exchanges",e=>this.exchanges=e)),this.unsubscribe.push(kt.subscribeKey("isLoading",e=>this.isLoading=e)),kt.fetchExchanges(),kt.setSelectedExchange(void 0)}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return S`
      <wui-flex flexDirection="column">
        ${this.paymentDetailsTemplate()} ${this.paymentMethodsTemplate()}
      </wui-flex>
    `}paymentMethodsTemplate(){return S`
      <wui-flex flexDirection="column" padding="3" gap="2" class="payment-methods-container">
        ${this.payWithWalletTemplate()} ${this.templateSeparator()}
        ${this.templateExchangeOptions()}
      </wui-flex>
    `}initializeNamespace(){const e=l.state.activeChain;this.namespace=e,this.caipAddress=l.getAccountData(e)?.caipAddress,this.unsubscribe.push(l.subscribeChainProp("accountState",e=>{this.caipAddress=e?.caipAddress},e))}paymentDetailsTemplate(){const e=l.getAllRequestedCaipNetworks().find(e=>e.caipNetworkId===this.paymentAsset.network);return S`
      <wui-flex
        alignItems="center"
        justifyContent="space-between"
        .padding=${["6","8","6","8"]}
        gap="2"
      >
        <wui-flex alignItems="center" gap="1">
          <wui-text variant="h1-regular" color="primary">
            ${wt(this.amount||"0")}
          </wui-text>

          <wui-flex flexDirection="column">
            <wui-text variant="h6-regular" color="secondary">
              ${this.paymentAsset.metadata.symbol||"Unknown"}
            </wui-text>
            <wui-text variant="md-medium" color="secondary"
              >on ${e?.name||"Unknown"}</wui-text
            >
          </wui-flex>
        </wui-flex>

        <wui-flex class="left-image-container">
          <wui-image
            src=${M(this.paymentAsset.metadata.logoURI)}
            class="token-image"
          ></wui-image>
          <wui-image
            src=${M(z.getNetworkImage(e))}
            class="chain-image"
          ></wui-image>
        </wui-flex>
      </wui-flex>
    `}payWithWalletTemplate(){return function(e){const{chainNamespace:t}=I.parseCaipNetworkId(e);return pt.includes(t)}(this.paymentAsset.network)?this.caipAddress?this.connectedWalletTemplate():this.disconnectedWalletTemplate():S``}connectedWalletTemplate(){const{name:e,image:t}=this.getWalletProperties({namespace:this.namespace});return S`
      <wui-flex flexDirection="column" gap="3">
        <wui-list-item
          type="secondary"
          boxColor="foregroundSecondary"
          @click=${this.onWalletPayment}
          .boxed=${!1}
          ?chevron=${!0}
          ?fullSize=${!1}
          ?rounded=${!0}
          data-testid="wallet-payment-option"
          imageSrc=${M(t)}
          imageSize="3xl"
        >
          <wui-text variant="lg-regular" color="primary">Pay with ${e}</wui-text>
        </wui-list-item>

        <wui-list-item
          type="secondary"
          icon="power"
          iconColor="error"
          @click=${this.onDisconnect}
          data-testid="disconnect-button"
          ?chevron=${!1}
          boxColor="foregroundSecondary"
        >
          <wui-text variant="lg-regular" color="secondary">Disconnect</wui-text>
        </wui-list-item>
      </wui-flex>
    `}disconnectedWalletTemplate(){return S`<wui-list-item
      type="secondary"
      boxColor="foregroundSecondary"
      variant="icon"
      iconColor="default"
      iconVariant="overlay"
      icon="wallet"
      @click=${this.onWalletPayment}
      ?chevron=${!0}
      data-testid="wallet-payment-option"
    >
      <wui-text variant="lg-regular" color="primary">Pay with wallet</wui-text>
    </wui-list-item>`}templateExchangeOptions(){if(this.isLoading)return S`<wui-flex justifyContent="center" alignItems="center">
        <wui-loading-spinner size="md"></wui-loading-spinner>
      </wui-flex>`;const e=this.exchanges.filter(e=>function(e){const t=l.getAllRequestedCaipNetworks().find(t=>t.caipNetworkId===e.network);return!!t&&Boolean(t.testnet)}(this.paymentAsset)?e.id===it:e.id!==it);return 0===e.length?S`<wui-flex justifyContent="center" alignItems="center">
        <wui-text variant="md-medium" color="primary">No exchanges available</wui-text>
      </wui-flex>`:e.map(e=>S`
        <wui-list-item
          type="secondary"
          boxColor="foregroundSecondary"
          @click=${()=>this.onExchangePayment(e)}
          data-testid="exchange-option-${e.id}"
          ?chevron=${!0}
          imageSrc=${M(e.imageUrl)}
        >
          <wui-text flexGrow="1" variant="lg-regular" color="primary">
            Pay with ${e.name}
          </wui-text>
        </wui-list-item>
      `)}templateSeparator(){return S`<wui-separator text="or" bgColor="secondary"></wui-separator>`}async onWalletPayment(){if(!this.namespace)throw new Error("Namespace not found");this.caipAddress?i.push("PayQuote"):(await y.connect(),await b.open({view:"PayQuote"}))}onExchangePayment(e){kt.setSelectedExchange(e),i.push("PayQuote")}async onDisconnect(){try{await a.disconnect(),await b.open({view:"Pay"})}catch{console.error("Failed to disconnect"),o.showError("Failed to disconnect")}}getWalletProperties({namespace:e}){if(!e)return{name:void 0,image:void 0};const t=this.activeConnectorIds[e];if(!t)return{name:void 0,image:void 0};const i=y.getConnector({id:t,namespace:e});if(!i)return{name:void 0,image:void 0};const o=z.getConnectorImage(i);return{name:i.name,image:o}}};St.styles=xt,Tt([H()],St.prototype,"amount",void 0),Tt([H()],St.prototype,"namespace",void 0),Tt([H()],St.prototype,"paymentAsset",void 0),Tt([H()],St.prototype,"activeConnectorIds",void 0),Tt([H()],St.prototype,"caipAddress",void 0),Tt([H()],St.prototype,"exchanges",void 0),Tt([H()],St.prototype,"isLoading",void 0),St=Tt([q("w3m-pay-view")],St);const At=k`
  :host {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .pulse-container {
    position: relative;
    width: var(--pulse-size);
    height: var(--pulse-size);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .pulse-rings {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .pulse-ring {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: 2px solid var(--pulse-color);
    opacity: 0;
    animation: pulse var(--pulse-duration, 2s) ease-out infinite;
  }

  .pulse-content {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @keyframes pulse {
    0% {
      transform: scale(0.5);
      opacity: var(--pulse-opacity, 0.3);
    }
    50% {
      opacity: calc(var(--pulse-opacity, 0.3) * 0.5);
    }
    100% {
      transform: scale(1.2);
      opacity: 0;
    }
  }
`;var $t=function(e,t,i,o){var a,n=arguments.length,r=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,i,r):a(t,i))||r);return n>3&&r&&Object.defineProperty(t,i,r),r};const Pt={"accent-primary":D.tokens.core.backgroundAccentPrimary};let Ct=class extends T{constructor(){super(...arguments),this.rings=3,this.duration=2,this.opacity=.3,this.size="200px",this.variant="accent-primary"}render(){const e=Pt[this.variant];this.style.cssText=`\n      --pulse-size: ${this.size};\n      --pulse-duration: ${this.duration}s;\n      --pulse-color: ${e};\n      --pulse-opacity: ${this.opacity};\n    `;const t=Array.from({length:this.rings},(e,t)=>this.renderRing(t,this.rings));return S`
      <div class="pulse-container">
        <div class="pulse-rings">${t}</div>
        <div class="pulse-content">
          <slot></slot>
        </div>
      </div>
    `}renderRing(e,t){const i=e/t*this.duration;return S`<div class="pulse-ring" style=${`animation-delay: ${i}s;`}></div>`}};Ct.styles=[x,At],$t([_({type:Number})],Ct.prototype,"rings",void 0),$t([_({type:Number})],Ct.prototype,"duration",void 0),$t([_({type:Number})],Ct.prototype,"opacity",void 0),$t([_()],Ct.prototype,"size",void 0),$t([_()],Ct.prototype,"variant",void 0),Ct=$t([q("wui-pulse")],Ct);const It=[{id:"received",title:"Receiving funds",icon:"dollar"},{id:"processing",title:"Swapping asset",icon:"recycleHorizontal"},{id:"sending",title:"Sending asset to the recipient address",icon:"send"}],Et=["success","submitted","failure","timeout","refund"],Nt=k`
  :host {
    display: block;
    height: 100%;
    width: 100%;
  }

  wui-image {
    border-radius: ${({borderRadius:e})=>e.round};
  }

  .token-badge-container {
    position: absolute;
    bottom: 6px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: ${({borderRadius:e})=>e[4]};
    z-index: 3;
    min-width: 105px;
  }

  .token-badge-container.loading {
    background-color: ${({tokens:e})=>e.theme.backgroundPrimary};
    border: 3px solid ${({tokens:e})=>e.theme.backgroundPrimary};
  }

  .token-badge-container.success {
    background-color: ${({tokens:e})=>e.theme.backgroundPrimary};
    border: 3px solid ${({tokens:e})=>e.theme.backgroundPrimary};
  }

  .token-image-container {
    position: relative;
  }

  .token-image {
    border-radius: ${({borderRadius:e})=>e.round};
    width: 64px;
    height: 64px;
  }

  .token-image.success {
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
  }

  .token-image.error {
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
  }

  .token-image.loading {
    background: ${({colors:e})=>e.accent010};
  }

  .token-image wui-icon {
    width: 32px;
    height: 32px;
  }

  .token-badge {
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    border: 1px solid ${({tokens:e})=>e.theme.foregroundSecondary};
    border-radius: ${({borderRadius:e})=>e[4]};
  }

  .token-badge wui-text {
    white-space: nowrap;
  }

  .payment-lifecycle-container {
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    border-top-right-radius: ${({borderRadius:e})=>e[6]};
    border-top-left-radius: ${({borderRadius:e})=>e[6]};
  }

  .payment-step-badge {
    padding: ${({spacing:e})=>e[1]} ${({spacing:e})=>e[2]};
    border-radius: ${({borderRadius:e})=>e[1]};
  }

  .payment-step-badge.loading {
    background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
  }

  .payment-step-badge.error {
    background-color: ${({tokens:e})=>e.core.backgroundError};
  }

  .payment-step-badge.success {
    background-color: ${({tokens:e})=>e.core.backgroundSuccess};
  }

  .step-icon-container {
    position: relative;
    height: 40px;
    width: 40px;
    border-radius: ${({borderRadius:e})=>e.round};
    background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
  }

  .step-icon-box {
    position: absolute;
    right: -4px;
    bottom: -1px;
    padding: 2px;
    border-radius: ${({borderRadius:e})=>e.round};
    border: 2px solid ${({tokens:e})=>e.theme.backgroundPrimary};
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
  }

  .step-icon-box.success {
    background-color: ${({tokens:e})=>e.core.backgroundSuccess};
  }
`;var Rt=function(e,t,i,o){var a,n=arguments.length,r=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,i,r):a(t,i))||r);return n>3&&r&&Object.defineProperty(t,i,r),r};const Ot={received:["pending","success","submitted"],processing:["success","submitted"],sending:["success","submitted"]};let zt=class extends T{constructor(){super(),this.unsubscribe=[],this.pollingInterval=null,this.paymentAsset=kt.state.paymentAsset,this.quoteStatus=kt.state.quoteStatus,this.quote=kt.state.quote,this.amount=kt.state.amount,this.namespace=void 0,this.caipAddress=void 0,this.profileName=null,this.activeConnectorIds=y.state.activeConnectorIds,this.selectedExchange=kt.state.selectedExchange,this.initializeNamespace(),this.unsubscribe.push(kt.subscribeKey("quoteStatus",e=>this.quoteStatus=e),kt.subscribeKey("quote",e=>this.quote=e),y.subscribeKey("activeConnectorIds",e=>this.activeConnectorIds=e),kt.subscribeKey("selectedExchange",e=>this.selectedExchange=e))}connectedCallback(){super.connectedCallback(),this.startPolling()}disconnectedCallback(){super.disconnectedCallback(),this.stopPolling(),this.unsubscribe.forEach(e=>e())}render(){return S`
      <wui-flex flexDirection="column" .padding=${["3","0","0","0"]} gap="2">
        ${this.tokenTemplate()} ${this.paymentTemplate()} ${this.paymentLifecycleTemplate()}
      </wui-flex>
    `}tokenTemplate(){const e=wt(this.amount||"0"),t=this.paymentAsset.metadata.symbol??"Unknown",i=l.getAllRequestedCaipNetworks().find(e=>e.caipNetworkId===this.paymentAsset.network),o="failure"===this.quoteStatus||"timeout"===this.quoteStatus||"refund"===this.quoteStatus;return"success"===this.quoteStatus||"submitted"===this.quoteStatus?S`<wui-flex alignItems="center" justifyContent="center">
        <wui-flex justifyContent="center" alignItems="center" class="token-image success">
          <wui-icon name="checkmark" color="success" size="inherit"></wui-icon>
        </wui-flex>
      </wui-flex>`:o?S`<wui-flex alignItems="center" justifyContent="center">
        <wui-flex justifyContent="center" alignItems="center" class="token-image error">
          <wui-icon name="close" color="error" size="inherit"></wui-icon>
        </wui-flex>
      </wui-flex>`:S`
      <wui-flex alignItems="center" justifyContent="center">
        <wui-flex class="token-image-container">
          <wui-pulse size="125px" rings="3" duration="4" opacity="0.5" variant="accent-primary">
            <wui-flex justifyContent="center" alignItems="center" class="token-image loading">
              <wui-icon name="paperPlaneTitle" color="accent-primary" size="inherit"></wui-icon>
            </wui-flex>
          </wui-pulse>

          <wui-flex
            justifyContent="center"
            alignItems="center"
            class="token-badge-container loading"
          >
            <wui-flex
              alignItems="center"
              justifyContent="center"
              gap="01"
              padding="1"
              class="token-badge"
            >
              <wui-image
                src=${M(z.getNetworkImage(i))}
                class="chain-image"
                size="mdl"
              ></wui-image>

              <wui-text variant="lg-regular" color="primary">${e} ${t}</wui-text>
            </wui-flex>
          </wui-flex>
        </wui-flex>
      </wui-flex>
    `}paymentTemplate(){return S`
      <wui-flex flexDirection="column" gap="2" .padding=${["0","6","0","6"]}>
        ${this.renderPayment()}
        <wui-separator></wui-separator>
        ${this.renderWallet()}
      </wui-flex>
    `}paymentLifecycleTemplate(){const e=this.getStepsWithStatus();return S`
      <wui-flex flexDirection="column" padding="4" gap="2" class="payment-lifecycle-container">
        <wui-flex alignItems="center" justifyContent="space-between">
          <wui-text variant="md-regular" color="secondary">PAYMENT CYCLE</wui-text>

          ${this.renderPaymentCycleBadge()}
        </wui-flex>

        <wui-flex flexDirection="column" gap="5" .padding=${["2","0","2","0"]}>
          ${e.map(e=>this.renderStep(e))}
        </wui-flex>
      </wui-flex>
    `}renderPaymentCycleBadge(){const e="failure"===this.quoteStatus||"timeout"===this.quoteStatus||"refund"===this.quoteStatus,t="success"===this.quoteStatus||"submitted"===this.quoteStatus;if(e)return S`
        <wui-flex
          justifyContent="center"
          alignItems="center"
          class="payment-step-badge error"
          gap="1"
        >
          <wui-icon name="close" color="error" size="xs"></wui-icon>
          <wui-text variant="sm-regular" color="error">Failed</wui-text>
        </wui-flex>
      `;if(t)return S`
        <wui-flex
          justifyContent="center"
          alignItems="center"
          class="payment-step-badge success"
          gap="1"
        >
          <wui-icon name="checkmark" color="success" size="xs"></wui-icon>
          <wui-text variant="sm-regular" color="success">Completed</wui-text>
        </wui-flex>
      `;const i=this.quote?.timeInSeconds??0;return S`
      <wui-flex alignItems="center" justifyContent="space-between" gap="3">
        <wui-flex
          justifyContent="center"
          alignItems="center"
          class="payment-step-badge loading"
          gap="1"
        >
          <wui-icon name="clock" color="default" size="xs"></wui-icon>
          <wui-text variant="sm-regular" color="primary">Est. ${i} sec</wui-text>
        </wui-flex>

        <wui-icon name="chevronBottom" color="default" size="xxs"></wui-icon>
      </wui-flex>
    `}renderPayment(){const t=l.getAllRequestedCaipNetworks().find(e=>{const t=this.quote?.origin.currency.network;if(!t)return!1;const{chainId:i}=I.parseCaipNetworkId(t);return N.isLowerCaseMatch(e.id.toString(),i.toString())}),i=wt(e.formatNumber(this.quote?.origin.amount||"0",{decimals:this.quote?.origin.currency.metadata.decimals??0}).toString()),o=this.quote?.origin.currency.metadata.symbol??"Unknown";return S`
      <wui-flex
        alignItems="flex-start"
        justifyContent="space-between"
        .padding=${["3","0","3","0"]}
      >
        <wui-text variant="lg-regular" color="secondary">Payment Method</wui-text>

        <wui-flex flexDirection="column" alignItems="flex-end" gap="1">
          <wui-flex alignItems="center" gap="01">
            <wui-text variant="lg-regular" color="primary">${i}</wui-text>
            <wui-text variant="lg-regular" color="secondary">${o}</wui-text>
          </wui-flex>

          <wui-flex alignItems="center" gap="1">
            <wui-text variant="md-regular" color="secondary">on</wui-text>
            <wui-image
              src=${M(z.getNetworkImage(t))}
              size="xs"
            ></wui-image>
            <wui-text variant="md-regular" color="secondary">${t?.name}</wui-text>
          </wui-flex>
        </wui-flex>
      </wui-flex>
    `}renderWallet(){return S`
      <wui-flex
        alignItems="flex-start"
        justifyContent="space-between"
        .padding=${["3","0","3","0"]}
      >
        <wui-text variant="lg-regular" color="secondary">Wallet</wui-text>

        ${this.renderWalletText()}
      </wui-flex>
    `}renderWalletText(){const{image:e}=this.getWalletProperties({namespace:this.namespace}),{address:t}=this.caipAddress?I.parseCaipAddress(this.caipAddress):{},i=this.selectedExchange?.name;return this.selectedExchange?S`
        <wui-flex alignItems="center" justifyContent="flex-end" gap="1">
          <wui-text variant="lg-regular" color="primary">${i}</wui-text>
          <wui-image src=${M(this.selectedExchange.imageUrl)} size="mdl"></wui-image>
        </wui-flex>
      `:S`
      <wui-flex alignItems="center" justifyContent="flex-end" gap="1">
        <wui-text variant="lg-regular" color="primary">
          ${K.getTruncateString({string:this.profileName||t||i||"",charsStart:this.profileName?16:4,charsEnd:this.profileName?0:6,truncate:this.profileName?"end":"middle"})}
        </wui-text>

        <wui-image src=${M(e)} size="mdl"></wui-image>
      </wui-flex>
    `}getStepsWithStatus(){return"failure"===this.quoteStatus||"timeout"===this.quoteStatus||"refund"===this.quoteStatus?It.map(e=>({...e,status:"failed"})):It.map(e=>{const t=(Ot[e.id]??[]).includes(this.quoteStatus)?"completed":"pending";return{...e,status:t}})}renderStep({title:e,icon:t,status:i}){return S`
      <wui-flex alignItems="center" gap="3">
        <wui-flex justifyContent="center" alignItems="center" class="step-icon-container">
          <wui-icon name=${t} color="default" size="mdl"></wui-icon>

          <wui-flex alignItems="center" justifyContent="center" class=${Q({"step-icon-box":!0,success:"completed"===i})}>
            ${this.renderStatusIndicator(i)}
          </wui-flex>
        </wui-flex>

        <wui-text variant="md-regular" color="primary">${e}</wui-text>
      </wui-flex>
    `}renderStatusIndicator(e){return"completed"===e?S`<wui-icon size="sm" color="success" name="checkmark"></wui-icon>`:"failed"===e?S`<wui-icon size="sm" color="error" name="close"></wui-icon>`:"pending"===e?S`<wui-loading-spinner color="accent-primary" size="sm"></wui-loading-spinner>`:null}startPolling(){this.pollingInterval||(this.fetchQuoteStatus(),this.pollingInterval=setInterval(()=>{this.fetchQuoteStatus()},3e3))}stopPolling(){this.pollingInterval&&(clearInterval(this.pollingInterval),this.pollingInterval=null)}async fetchQuoteStatus(){const e=kt.state.requestId;if(!e||Et.includes(this.quoteStatus))this.stopPolling();else try{await kt.fetchQuoteStatus({requestId:e}),Et.includes(this.quoteStatus)&&this.stopPolling()}catch{this.stopPolling()}}initializeNamespace(){const e=l.state.activeChain;this.namespace=e,this.caipAddress=l.getAccountData(e)?.caipAddress,this.profileName=l.getAccountData(e)?.profileName??null,this.unsubscribe.push(l.subscribeChainProp("accountState",e=>{this.caipAddress=e?.caipAddress,this.profileName=e?.profileName??null},e))}getWalletProperties({namespace:e}){if(!e)return{name:void 0,image:void 0};const t=this.activeConnectorIds[e];if(!t)return{name:void 0,image:void 0};const i=y.getConnector({id:t,namespace:e});if(!i)return{name:void 0,image:void 0};const o=z.getConnectorImage(i);return{name:i.name,image:o}}};zt.styles=Nt,Rt([H()],zt.prototype,"paymentAsset",void 0),Rt([H()],zt.prototype,"quoteStatus",void 0),Rt([H()],zt.prototype,"quote",void 0),Rt([H()],zt.prototype,"amount",void 0),Rt([H()],zt.prototype,"namespace",void 0),Rt([H()],zt.prototype,"caipAddress",void 0),Rt([H()],zt.prototype,"profileName",void 0),Rt([H()],zt.prototype,"activeConnectorIds",void 0),Rt([H()],zt.prototype,"selectedExchange",void 0),zt=Rt([q("w3m-pay-loading-view")],zt);const Dt=k`
  button {
    display: flex;
    align-items: center;
    height: 40px;
    padding: ${({spacing:e})=>e[2]};
    border-radius: ${({borderRadius:e})=>e[4]};
    column-gap: ${({spacing:e})=>e[1]};
    background-color: transparent;
    transition: background-color ${({durations:e})=>e.lg}
      ${({easings:e})=>e["ease-out-power-2"]};
    will-change: background-color;
  }

  wui-image,
  .icon-box {
    width: ${({spacing:e})=>e[6]};
    height: ${({spacing:e})=>e[6]};
    border-radius: ${({borderRadius:e})=>e[4]};
  }

  wui-text {
    flex: 1;
  }

  .icon-box {
    position: relative;
  }

  .icon-box[data-active='true'] {
    background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
  }

  .circle {
    position: absolute;
    left: 16px;
    top: 15px;
    width: 8px;
    height: 8px;
    background-color: ${({tokens:e})=>e.core.textSuccess};
    box-shadow: 0 0 0 2px ${({tokens:e})=>e.theme.foregroundPrimary};
    border-radius: 50%;
  }

  /* -- Hover & Active states ----------------------------------------------------------- */
  @media (hover: hover) {
    button:hover:enabled,
    button:active:enabled {
      background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    }
  }
`;var Ut=function(e,t,i,o){var a,n=arguments.length,r=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,i,r):a(t,i))||r);return n>3&&r&&Object.defineProperty(t,i,r),r};let Wt=class extends T{constructor(){super(...arguments),this.address="",this.profileName="",this.alt="",this.imageSrc="",this.icon=void 0,this.iconSize="md",this.enableGreenCircle=!0,this.loading=!1,this.charsStart=4,this.charsEnd=6}render(){return S`
      <button>
        ${this.leftImageTemplate()} ${this.textTemplate()} ${this.rightImageTemplate()}
      </button>
    `}leftImageTemplate(){const e=this.icon?S`<wui-icon
          size=${M(this.iconSize)}
          color="default"
          name=${this.icon}
          class="icon"
        ></wui-icon>`:S`<wui-image src=${this.imageSrc} alt=${this.alt}></wui-image>`;return S`
      <wui-flex
        alignItems="center"
        justifyContent="center"
        class="icon-box"
        data-active=${Boolean(this.icon)}
      >
        ${e}
        ${this.enableGreenCircle?S`<wui-flex class="circle"></wui-flex>`:null}
      </wui-flex>
    `}textTemplate(){return S`
      <wui-text variant="lg-regular" color="primary">
        ${K.getTruncateString({string:this.profileName||this.address,charsStart:this.profileName?16:this.charsStart,charsEnd:this.profileName?0:this.charsEnd,truncate:this.profileName?"end":"middle"})}
      </wui-text>
    `}rightImageTemplate(){return S`<wui-icon name="chevronBottom" size="sm" color="default"></wui-icon>`}};Wt.styles=[x,A,Dt],Ut([_()],Wt.prototype,"address",void 0),Ut([_()],Wt.prototype,"profileName",void 0),Ut([_()],Wt.prototype,"alt",void 0),Ut([_()],Wt.prototype,"imageSrc",void 0),Ut([_()],Wt.prototype,"icon",void 0),Ut([_()],Wt.prototype,"iconSize",void 0),Ut([_({type:Boolean})],Wt.prototype,"enableGreenCircle",void 0),Ut([_({type:Boolean})],Wt.prototype,"loading",void 0),Ut([_({type:Number})],Wt.prototype,"charsStart",void 0),Ut([_({type:Number})],Wt.prototype,"charsEnd",void 0),Wt=Ut([q("wui-wallet-switch")],Wt);const jt=U`
  :host {
    display: block;
  }
`;var Bt=function(e,t,i,o){var a,n=arguments.length,r=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,i,r):a(t,i))||r);return n>3&&r&&Object.defineProperty(t,i,r),r};let Ft=class extends T{render(){return S`
      <wui-flex flexDirection="column" gap="4">
        <wui-flex alignItems="center" justifyContent="space-between">
          <wui-text variant="md-regular" color="secondary">Pay</wui-text>
          <wui-shimmer width="60px" height="16px" borderRadius="4xs" variant="light"></wui-shimmer>
        </wui-flex>

        <wui-flex alignItems="center" justifyContent="space-between">
          <wui-text variant="md-regular" color="secondary">Network Fee</wui-text>

          <wui-flex flexDirection="column" alignItems="flex-end" gap="2">
            <wui-shimmer
              width="75px"
              height="16px"
              borderRadius="4xs"
              variant="light"
            ></wui-shimmer>

            <wui-flex alignItems="center" gap="01">
              <wui-shimmer width="14px" height="14px" rounded variant="light"></wui-shimmer>
              <wui-shimmer
                width="49px"
                height="14px"
                borderRadius="4xs"
                variant="light"
              ></wui-shimmer>
            </wui-flex>
          </wui-flex>
        </wui-flex>

        <wui-flex alignItems="center" justifyContent="space-between">
          <wui-text variant="md-regular" color="secondary">Service Fee</wui-text>
          <wui-shimmer width="75px" height="16px" borderRadius="4xs" variant="light"></wui-shimmer>
        </wui-flex>
      </wui-flex>
    `}};Ft.styles=[jt],Ft=Bt([q("w3m-pay-fees-skeleton")],Ft);const Lt=k`
  :host {
    display: block;
  }

  wui-image {
    border-radius: ${({borderRadius:e})=>e.round};
  }
`;var qt=function(e,t,i,o){var a,n=arguments.length,r=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,i,r):a(t,i))||r);return n>3&&r&&Object.defineProperty(t,i,r),r};let _t=class extends T{constructor(){super(),this.unsubscribe=[],this.quote=kt.state.quote,this.unsubscribe.push(kt.subscribeKey("quote",e=>this.quote=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const t=e.formatNumber(this.quote?.origin.amount||"0",{decimals:this.quote?.origin.currency.metadata.decimals??0,round:6}).toString();return S`
      <wui-flex flexDirection="column" gap="4">
        <wui-flex alignItems="center" justifyContent="space-between">
          <wui-text variant="md-regular" color="secondary">Pay</wui-text>
          <wui-text variant="md-regular" color="primary">
            ${t} ${this.quote?.origin.currency.metadata.symbol||"Unknown"}
          </wui-text>
        </wui-flex>

        ${this.quote&&this.quote.fees.length>0?this.quote.fees.map(e=>this.renderFee(e)):null}
      </wui-flex>
    `}renderFee(t){const i="network"===t.id,o=e.formatNumber(t.amount||"0",{decimals:t.currency.metadata.decimals??0,round:6}).toString();if(i){const e=l.getAllRequestedCaipNetworks().find(e=>N.isLowerCaseMatch(e.caipNetworkId,t.currency.network));return S`
        <wui-flex alignItems="center" justifyContent="space-between">
          <wui-text variant="md-regular" color="secondary">${t.label}</wui-text>

          <wui-flex flexDirection="column" alignItems="flex-end" gap="2">
            <wui-text variant="md-regular" color="primary">
              ${o} ${t.currency.metadata.symbol||"Unknown"}
            </wui-text>

            <wui-flex alignItems="center" gap="01">
              <wui-image
                src=${M(z.getNetworkImage(e))}
                size="xs"
              ></wui-image>
              <wui-text variant="sm-regular" color="secondary">
                ${e?.name||"Unknown"}
              </wui-text>
            </wui-flex>
          </wui-flex>
        </wui-flex>
      `}return S`
      <wui-flex alignItems="center" justifyContent="space-between">
        <wui-text variant="md-regular" color="secondary">${t.label}</wui-text>
        <wui-text variant="md-regular" color="primary">
          ${o} ${t.currency.metadata.symbol||"Unknown"}
        </wui-text>
      </wui-flex>
    `}};_t.styles=[Lt],qt([H()],_t.prototype,"quote",void 0),_t=qt([q("w3m-pay-fees")],_t);const Mt=k`
  :host {
    display: block;
    width: 100%;
  }

  .disabled-container {
    padding: ${({spacing:e})=>e[2]};
    min-height: 168px;
  }

  wui-icon {
    width: ${({spacing:e})=>e[8]};
    height: ${({spacing:e})=>e[8]};
  }

  wui-flex > wui-text {
    max-width: 273px;
  }
`;var Ht=function(e,t,i,o){var a,n=arguments.length,r=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,i,r):a(t,i))||r);return n>3&&r&&Object.defineProperty(t,i,r),r};let Vt=class extends T{constructor(){super(),this.unsubscribe=[],this.selectedExchange=kt.state.selectedExchange,this.unsubscribe.push(kt.subscribeKey("selectedExchange",e=>this.selectedExchange=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const e=Boolean(this.selectedExchange);return S`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap="3"
        class="disabled-container"
      >
        <wui-icon name="coins" color="default" size="inherit"></wui-icon>

        <wui-text variant="md-regular" color="primary" align="center">
          You don't have enough funds to complete this transaction
        </wui-text>

        ${e?null:S`<wui-button
              size="md"
              variant="neutral-secondary"
              @click=${this.dispatchConnectOtherWalletEvent.bind(this)}
              >Connect other wallet</wui-button
            >`}
      </wui-flex>
    `}dispatchConnectOtherWalletEvent(){this.dispatchEvent(new CustomEvent("connectOtherWallet",{detail:!0,bubbles:!0,composed:!0}))}};Vt.styles=[Mt],Ht([_({type:Array})],Vt.prototype,"selectedExchange",void 0),Vt=Ht([q("w3m-pay-options-empty")],Vt);const Kt=k`
  :host {
    display: block;
    width: 100%;
  }

  .pay-options-container {
    max-height: 196px;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
  }

  .pay-options-container::-webkit-scrollbar {
    display: none;
  }

  .pay-option-container {
    border-radius: ${({borderRadius:e})=>e[4]};
    padding: ${({spacing:e})=>e[3]};
    min-height: 60px;
  }

  .token-images-container {
    position: relative;
    justify-content: center;
    align-items: center;
  }

  .chain-image {
    position: absolute;
    bottom: -3px;
    right: -5px;
    border: 2px solid ${({tokens:e})=>e.theme.foregroundSecondary};
  }
`;var Qt=function(e,t,i,o){var a,n=arguments.length,r=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,i,r):a(t,i))||r);return n>3&&r&&Object.defineProperty(t,i,r),r};let Gt=class extends T{render(){return S`
      <wui-flex flexDirection="column" gap="2" class="pay-options-container">
        ${this.renderOptionEntry()} ${this.renderOptionEntry()} ${this.renderOptionEntry()}
      </wui-flex>
    `}renderOptionEntry(){return S`
      <wui-flex
        alignItems="center"
        justifyContent="space-between"
        gap="2"
        class="pay-option-container"
      >
        <wui-flex alignItems="center" gap="2">
          <wui-flex class="token-images-container">
            <wui-shimmer
              width="32px"
              height="32px"
              rounded
              variant="light"
              class="token-image"
            ></wui-shimmer>
            <wui-shimmer
              width="16px"
              height="16px"
              rounded
              variant="light"
              class="chain-image"
            ></wui-shimmer>
          </wui-flex>

          <wui-flex flexDirection="column" gap="1">
            <wui-shimmer
              width="74px"
              height="16px"
              borderRadius="4xs"
              variant="light"
            ></wui-shimmer>
            <wui-shimmer
              width="46px"
              height="14px"
              borderRadius="4xs"
              variant="light"
            ></wui-shimmer>
          </wui-flex>
        </wui-flex>
      </wui-flex>
    `}};Gt.styles=[Kt],Gt=Qt([q("w3m-pay-options-skeleton")],Gt);const Yt=k`
  :host {
    display: block;
    width: 100%;
  }

  .pay-options-container {
    max-height: 196px;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
    mask-image: var(--options-mask-image);
    -webkit-mask-image: var(--options-mask-image);
  }

  .pay-options-container::-webkit-scrollbar {
    display: none;
  }

  .pay-option-container {
    cursor: pointer;
    border-radius: ${({borderRadius:e})=>e[4]};
    padding: ${({spacing:e})=>e[3]};
    transition: background-color ${({durations:e})=>e.lg}
      ${({easings:e})=>e["ease-out-power-1"]};
    will-change: background-color;
  }

  .token-images-container {
    position: relative;
    justify-content: center;
    align-items: center;
  }

  .token-image {
    border-radius: ${({borderRadius:e})=>e.round};
    width: 32px;
    height: 32px;
  }

  .chain-image {
    position: absolute;
    width: 16px;
    height: 16px;
    bottom: -3px;
    right: -5px;
    border-radius: ${({borderRadius:e})=>e.round};
    border: 2px solid ${({tokens:e})=>e.theme.backgroundPrimary};
  }

  @media (hover: hover) and (pointer: fine) {
    .pay-option-container:hover {
      background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    }
  }
`;var Xt=function(e,t,i,o){var a,n=arguments.length,r=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,i,r):a(t,i))||r);return n>3&&r&&Object.defineProperty(t,i,r),r};let Zt=class extends T{constructor(){super(),this.unsubscribe=[],this.options=[],this.selectedPaymentAsset=null}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),this.resizeObserver?.disconnect();const e=this.shadowRoot?.querySelector(".pay-options-container");e?.removeEventListener("scroll",this.handleOptionsListScroll.bind(this))}firstUpdated(){const e=this.shadowRoot?.querySelector(".pay-options-container");e&&(requestAnimationFrame(this.handleOptionsListScroll.bind(this)),e?.addEventListener("scroll",this.handleOptionsListScroll.bind(this)),this.resizeObserver=new ResizeObserver(()=>{this.handleOptionsListScroll()}),this.resizeObserver?.observe(e),this.handleOptionsListScroll())}render(){return S`
      <wui-flex flexDirection="column" gap="2" class="pay-options-container">
        ${this.options.map(e=>this.payOptionTemplate(e))}
      </wui-flex>
    `}payOptionTemplate(t){const{network:i,metadata:o,asset:a,amount:n="0"}=t,r=l.getAllRequestedCaipNetworks().find(e=>e.caipNetworkId===i),s=`${i}:${a}`===`${this.selectedPaymentAsset?.network}:${this.selectedPaymentAsset?.asset}`,c=e.bigNumber(n,{safe:!0}),d=c.gt(0);return S`
      <wui-flex
        alignItems="center"
        justifyContent="space-between"
        gap="2"
        @click=${()=>this.onSelect?.(t)}
        class="pay-option-container"
      >
        <wui-flex alignItems="center" gap="2">
          <wui-flex class="token-images-container">
            <wui-image
              src=${M(o.logoURI)}
              class="token-image"
              size="3xl"
            ></wui-image>
            <wui-image
              src=${M(z.getNetworkImage(r))}
              class="chain-image"
              size="md"
            ></wui-image>
          </wui-flex>

          <wui-flex flexDirection="column" gap="1">
            <wui-text variant="lg-regular" color="primary">${o.symbol}</wui-text>
            ${d?S`<wui-text variant="sm-regular" color="secondary">
                  ${c.round(6).toString()} ${o.symbol}
                </wui-text>`:null}
          </wui-flex>
        </wui-flex>

        ${s?S`<wui-icon name="checkmark" size="md" color="success"></wui-icon>`:null}
      </wui-flex>
    `}handleOptionsListScroll(){const e=this.shadowRoot?.querySelector(".pay-options-container");if(!e)return;e.scrollHeight>300?(e.style.setProperty("--options-mask-image","linear-gradient(\n          to bottom,\n          rgba(0, 0, 0, calc(1 - var(--options-scroll--top-opacity))) 0px,\n          rgba(200, 200, 200, calc(1 - var(--options-scroll--top-opacity))) 1px,\n          black 50px,\n          black calc(100% - 50px),\n          rgba(155, 155, 155, calc(1 - var(--options-scroll--bottom-opacity))) calc(100% - 1px),\n          rgba(0, 0, 0, calc(1 - var(--options-scroll--bottom-opacity))) 100%\n        )"),e.style.setProperty("--options-scroll--top-opacity",re.interpolate([0,50],[0,1],e.scrollTop).toString()),e.style.setProperty("--options-scroll--bottom-opacity",re.interpolate([0,50],[0,1],e.scrollHeight-e.scrollTop-e.offsetHeight).toString())):(e.style.setProperty("--options-mask-image","none"),e.style.setProperty("--options-scroll--top-opacity","0"),e.style.setProperty("--options-scroll--bottom-opacity","0"))}};Zt.styles=[Yt],Xt([_({type:Array})],Zt.prototype,"options",void 0),Xt([_()],Zt.prototype,"selectedPaymentAsset",void 0),Xt([_()],Zt.prototype,"onSelect",void 0),Zt=Xt([q("w3m-pay-options")],Zt);const Jt=k`
  .payment-methods-container {
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    border-top-right-radius: ${({borderRadius:e})=>e[5]};
    border-top-left-radius: ${({borderRadius:e})=>e[5]};
  }

  .pay-options-container {
    background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
    border-radius: ${({borderRadius:e})=>e[5]};
    padding: ${({spacing:e})=>e[1]};
  }

  w3m-tooltip-trigger {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: fit-content;
  }

  wui-image {
    border-radius: ${({borderRadius:e})=>e.round};
  }

  w3m-pay-options.disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;var ei=function(e,t,i,o){var a,n=arguments.length,r=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,i,r):a(t,i))||r);return n>3&&r&&Object.defineProperty(t,i,r),r};const ti={eip155:{icon:"ethereum",label:"EVM"},solana:{icon:"solana",label:"Solana"},bip122:{icon:"bitcoin",label:"Bitcoin"},ton:{icon:"ton",label:"Ton"}};let ii=class extends T{constructor(){super(),this.unsubscribe=[],this.profileName=null,this.paymentAsset=kt.state.paymentAsset,this.namespace=void 0,this.caipAddress=void 0,this.amount=kt.state.amount,this.recipient=kt.state.recipient,this.activeConnectorIds=y.state.activeConnectorIds,this.selectedPaymentAsset=kt.state.selectedPaymentAsset,this.selectedExchange=kt.state.selectedExchange,this.isFetchingQuote=kt.state.isFetchingQuote,this.quoteError=kt.state.quoteError,this.quote=kt.state.quote,this.isFetchingTokenBalances=kt.state.isFetchingTokenBalances,this.tokenBalances=kt.state.tokenBalances,this.isPaymentInProgress=kt.state.isPaymentInProgress,this.exchangeUrlForQuote=kt.state.exchangeUrlForQuote,this.completedTransactionsCount=0,this.unsubscribe.push(kt.subscribeKey("paymentAsset",e=>this.paymentAsset=e)),this.unsubscribe.push(kt.subscribeKey("tokenBalances",e=>this.onTokenBalancesChanged(e))),this.unsubscribe.push(kt.subscribeKey("isFetchingTokenBalances",e=>this.isFetchingTokenBalances=e)),this.unsubscribe.push(y.subscribeKey("activeConnectorIds",e=>this.activeConnectorIds=e)),this.unsubscribe.push(kt.subscribeKey("selectedPaymentAsset",e=>this.selectedPaymentAsset=e)),this.unsubscribe.push(kt.subscribeKey("isFetchingQuote",e=>this.isFetchingQuote=e)),this.unsubscribe.push(kt.subscribeKey("quoteError",e=>this.quoteError=e)),this.unsubscribe.push(kt.subscribeKey("quote",e=>this.quote=e)),this.unsubscribe.push(kt.subscribeKey("amount",e=>this.amount=e)),this.unsubscribe.push(kt.subscribeKey("recipient",e=>this.recipient=e)),this.unsubscribe.push(kt.subscribeKey("isPaymentInProgress",e=>this.isPaymentInProgress=e)),this.unsubscribe.push(kt.subscribeKey("selectedExchange",e=>this.selectedExchange=e)),this.unsubscribe.push(kt.subscribeKey("exchangeUrlForQuote",e=>this.exchangeUrlForQuote=e)),this.resetQuoteState(),this.initializeNamespace(),this.fetchTokens()}disconnectedCallback(){super.disconnectedCallback(),this.resetAssetsState(),this.unsubscribe.forEach(e=>e())}updated(e){super.updated(e);e.has("selectedPaymentAsset")&&this.fetchQuote()}render(){return S`
      <wui-flex flexDirection="column">
        ${this.profileTemplate()}

        <wui-flex
          flexDirection="column"
          gap="4"
          class="payment-methods-container"
          .padding=${["4","4","5","4"]}
        >
          ${this.paymentOptionsViewTemplate()} ${this.amountWithFeeTemplate()}

          <wui-flex
            alignItems="center"
            justifyContent="space-between"
            .padding=${["1","0","1","0"]}
          >
            <wui-separator></wui-separator>
          </wui-flex>

          ${this.paymentActionsTemplate()}
        </wui-flex>
      </wui-flex>
    `}profileTemplate(){if(this.selectedExchange){const t=e.formatNumber(this.quote?.origin.amount,{decimals:this.quote?.origin.currency.metadata.decimals??0}).toString();return S`
        <wui-flex
          .padding=${["4","3","4","3"]}
          alignItems="center"
          justifyContent="space-between"
          gap="2"
        >
          <wui-text variant="lg-regular" color="secondary">Paying with</wui-text>

          ${this.quote?S`<wui-text variant="lg-regular" color="primary">
                ${e.bigNumber(t,{safe:!0}).round(6).toString()}
                ${this.quote.origin.currency.metadata.symbol}
              </wui-text>`:S`<wui-shimmer width="80px" height="18px" variant="light"></wui-shimmer>`}
        </wui-flex>
      `}const t=u.getPlainAddress(this.caipAddress)??"",{name:i,image:o}=this.getWalletProperties({namespace:this.namespace}),{icon:a,label:n}=ti[this.namespace]??{};return S`
      <wui-flex
        .padding=${["4","3","4","3"]}
        alignItems="center"
        justifyContent="space-between"
        gap="2"
      >
        <wui-wallet-switch
          profileName=${M(this.profileName)}
          address=${M(t)}
          imageSrc=${M(o)}
          alt=${M(i)}
          @click=${this.onConnectOtherWallet.bind(this)}
          data-testid="wui-wallet-switch"
        ></wui-wallet-switch>

        <wui-wallet-switch
          profileName=${M(n)}
          address=${M(t)}
          icon=${M(a)}
          iconSize="xs"
          .enableGreenCircle=${!1}
          alt=${M(n)}
          @click=${this.onConnectOtherWallet.bind(this)}
          data-testid="wui-wallet-switch"
        ></wui-wallet-switch>
      </wui-flex>
    `}initializeNamespace(){const e=l.state.activeChain;this.namespace=e,this.caipAddress=l.getAccountData(e)?.caipAddress,this.profileName=l.getAccountData(e)?.profileName??null,this.unsubscribe.push(l.subscribeChainProp("accountState",e=>this.onAccountStateChanged(e),e))}async fetchTokens(){if(this.namespace){let e;if(this.caipAddress){const{chainId:t,chainNamespace:i}=I.parseCaipAddress(this.caipAddress),o=`${i}:${t}`;e=l.getAllRequestedCaipNetworks().find(e=>e.caipNetworkId===o)}await kt.fetchTokens({caipAddress:this.caipAddress,caipNetwork:e,namespace:this.namespace})}}fetchQuote(){if(this.amount&&this.recipient&&this.selectedPaymentAsset&&this.paymentAsset){const{address:e}=this.caipAddress?I.parseCaipAddress(this.caipAddress):{};kt.fetchQuote({amount:this.amount.toString(),address:e,sourceToken:this.selectedPaymentAsset,toToken:this.paymentAsset,recipient:this.recipient})}}getWalletProperties({namespace:e}){if(!e)return{name:void 0,image:void 0};const t=this.activeConnectorIds[e];if(!t)return{name:void 0,image:void 0};const i=y.getConnector({id:t,namespace:e});if(!i)return{name:void 0,image:void 0};const o=z.getConnectorImage(i);return{name:i.name,image:o}}paymentOptionsViewTemplate(){return S`
      <wui-flex flexDirection="column" gap="2">
        <wui-text variant="sm-regular" color="secondary">CHOOSE PAYMENT OPTION</wui-text>
        <wui-flex class="pay-options-container">${this.paymentOptionsTemplate()}</wui-flex>
      </wui-flex>
    `}paymentOptionsTemplate(){const e=this.getPaymentAssetFromTokenBalances();if(this.isFetchingTokenBalances)return S`<w3m-pay-options-skeleton></w3m-pay-options-skeleton>`;if(0===e.length)return S`<w3m-pay-options-empty
        @connectOtherWallet=${this.onConnectOtherWallet.bind(this)}
      ></w3m-pay-options-empty>`;const t={disabled:this.isFetchingQuote};return S`<w3m-pay-options
      class=${Q(t)}
      .options=${e}
      .selectedPaymentAsset=${M(this.selectedPaymentAsset)}
      .onSelect=${this.onSelectedPaymentAssetChanged.bind(this)}
    ></w3m-pay-options>`}amountWithFeeTemplate(){return this.isFetchingQuote||!this.selectedPaymentAsset||this.quoteError?S`<w3m-pay-fees-skeleton></w3m-pay-fees-skeleton>`:S`<w3m-pay-fees></w3m-pay-fees>`}paymentActionsTemplate(){const t=this.isFetchingQuote||this.isFetchingTokenBalances,i=this.isFetchingQuote||this.isFetchingTokenBalances||!this.selectedPaymentAsset||Boolean(this.quoteError),o=e.formatNumber(this.quote?.origin.amount??0,{decimals:this.quote?.origin.currency.metadata.decimals??0}).toString();return this.selectedExchange?t||i?S`
          <wui-shimmer width="100%" height="48px" variant="light" ?rounded=${!0}></wui-shimmer>
        `:S`<wui-button
        size="lg"
        fullWidth
        variant="accent-secondary"
        @click=${this.onPayWithExchange.bind(this)}
      >
        ${`Continue in ${this.selectedExchange.name}`}

        <wui-icon name="arrowRight" color="inherit" size="sm" slot="iconRight"></wui-icon>
      </wui-button>`:S`
      <wui-flex alignItems="center" justifyContent="space-between">
        <wui-flex flexDirection="column" gap="1">
          <wui-text variant="md-regular" color="secondary">Order Total</wui-text>

          ${t||i?S`<wui-shimmer width="58px" height="32px" variant="light"></wui-shimmer>`:S`<wui-flex alignItems="center" gap="01">
                <wui-text variant="h4-regular" color="primary">${wt(o)}</wui-text>

                <wui-text variant="lg-regular" color="secondary">
                  ${this.quote?.origin.currency.metadata.symbol||"Unknown"}
                </wui-text>
              </wui-flex>`}
        </wui-flex>

        ${this.actionButtonTemplate({isLoading:t,isDisabled:i})}
      </wui-flex>
    `}actionButtonTemplate(e){const t=at(this.quote),{isLoading:i,isDisabled:o}=e;let a="Pay";return t.length>1&&0===this.completedTransactionsCount&&(a="Approve"),S`
      <wui-button
        size="lg"
        variant="accent-primary"
        ?loading=${i||this.isPaymentInProgress}
        ?disabled=${o||this.isPaymentInProgress}
        @click=${()=>{t.length>0?this.onSendTransactions():this.onTransfer()}}
      >
        ${a}
        ${i?null:S`<wui-icon
              name="arrowRight"
              color="inherit"
              size="sm"
              slot="iconRight"
            ></wui-icon>`}
      </wui-button>
    `}getPaymentAssetFromTokenBalances(){if(!this.namespace)return[];return(this.tokenBalances[this.namespace]??[]).map(e=>{try{return function(e){const t=l.getAllRequestedCaipNetworks().find(t=>t.caipNetworkId===e.chainId);let i=e.address;if(!t)throw new Error(`Target network not found for balance chainId "${e.chainId}"`);if(N.isLowerCaseMatch(e.symbol,t.nativeCurrency.symbol))i="native";else if(u.isCaipAddress(i)){const{address:e}=I.parseCaipAddress(i);i=e}else if(!i)throw new Error(`Balance address not found for balance symbol "${e.symbol}"`);return{network:t.caipNetworkId,asset:i,metadata:{name:e.name,symbol:e.symbol,decimals:Number(e.quantity.decimals),logoURI:e.iconUrl},amount:e.quantity.numeric}}(e)}catch(t){return null}}).filter(e=>Boolean(e)).filter(e=>{const{chainId:t}=I.parseCaipNetworkId(e.network),{chainId:i}=I.parseCaipNetworkId(this.paymentAsset.network);return!!N.isLowerCaseMatch(e.asset,this.paymentAsset.asset)||(!this.selectedExchange||!N.isLowerCaseMatch(t.toString(),i.toString()))})}onTokenBalancesChanged(e){this.tokenBalances=e;const[t]=this.getPaymentAssetFromTokenBalances();t&&kt.setSelectedPaymentAsset(t)}async onConnectOtherWallet(){await y.connect(),await b.open({view:"PayQuote"})}onAccountStateChanged(e){const{address:t}=this.caipAddress?I.parseCaipAddress(this.caipAddress):{};if(this.caipAddress=e?.caipAddress,this.profileName=e?.profileName??null,t){const{address:e}=this.caipAddress?I.parseCaipAddress(this.caipAddress):{};e?N.isLowerCaseMatch(e,t)||(this.resetAssetsState(),this.resetQuoteState(),this.fetchTokens()):b.close()}}onSelectedPaymentAssetChanged(e){this.isFetchingQuote||kt.setSelectedPaymentAsset(e)}async onTransfer(){const t=ot(this.quote);if(t){if(!N.isLowerCaseMatch(this.selectedPaymentAsset?.asset,t.deposit.currency))throw new Error("Quote asset is not the same as the selected payment asset");const a=this.selectedPaymentAsset?.amount??"0",n=e.formatNumber(t.deposit.amount,{decimals:this.selectedPaymentAsset?.metadata.decimals??0}).toString();if(!e.bigNumber(a).gte(n))return void o.showError("Insufficient funds");if(this.quote&&this.selectedPaymentAsset&&this.caipAddress&&this.namespace){const{address:e}=I.parseCaipAddress(this.caipAddress);await kt.onTransfer({chainNamespace:this.namespace,fromAddress:e,toAddress:t.deposit.receiver,amount:n,paymentAsset:this.selectedPaymentAsset}),kt.setRequestId(t.requestId),i.push("PayLoading")}}}async onSendTransactions(){const t=this.selectedPaymentAsset?.amount??"0",a=e.formatNumber(this.quote?.origin.amount??0,{decimals:this.selectedPaymentAsset?.metadata.decimals??0}).toString();if(!e.bigNumber(t).gte(a))return void o.showError("Insufficient funds");const n=at(this.quote),[r]=at(this.quote,this.completedTransactionsCount);if(r&&this.namespace){await kt.onSendTransaction({namespace:this.namespace,transactionStep:r}),this.completedTransactionsCount+=1;this.completedTransactionsCount===n.length&&(kt.setRequestId(r.requestId),i.push("PayLoading"))}}onPayWithExchange(){if(this.exchangeUrlForQuote){const e=u.returnOpenHref("","popupWindow","scrollbar=yes,width=480,height=720");if(!e)throw new Error("Could not create popup window");e.location.href=this.exchangeUrlForQuote;const t=ot(this.quote);t&&kt.setRequestId(t.requestId),kt.initiatePayment(),i.push("PayLoading")}}resetAssetsState(){kt.setSelectedPaymentAsset(null)}resetQuoteState(){kt.resetQuoteState()}};ii.styles=Jt,ei([H()],ii.prototype,"profileName",void 0),ei([H()],ii.prototype,"paymentAsset",void 0),ei([H()],ii.prototype,"namespace",void 0),ei([H()],ii.prototype,"caipAddress",void 0),ei([H()],ii.prototype,"amount",void 0),ei([H()],ii.prototype,"recipient",void 0),ei([H()],ii.prototype,"activeConnectorIds",void 0),ei([H()],ii.prototype,"selectedPaymentAsset",void 0),ei([H()],ii.prototype,"selectedExchange",void 0),ei([H()],ii.prototype,"isFetchingQuote",void 0),ei([H()],ii.prototype,"quoteError",void 0),ei([H()],ii.prototype,"quote",void 0),ei([H()],ii.prototype,"isFetchingTokenBalances",void 0),ei([H()],ii.prototype,"tokenBalances",void 0),ei([H()],ii.prototype,"isPaymentInProgress",void 0),ei([H()],ii.prototype,"exchangeUrlForQuote",void 0),ei([H()],ii.prototype,"completedTransactionsCount",void 0),ii=ei([q("w3m-pay-quote-view")],ii);const oi=k`
  wui-image {
    border-radius: ${({borderRadius:e})=>e.round};
  }

  .transfers-badge {
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    border: 1px solid ${({tokens:e})=>e.theme.foregroundSecondary};
    border-radius: ${({borderRadius:e})=>e[4]};
  }
`;var ai=function(e,t,i,o){var a,n=arguments.length,r=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,i,r):a(t,i))||r);return n>3&&r&&Object.defineProperty(t,i,r),r};let ni=class extends T{constructor(){super(),this.unsubscribe=[],this.paymentAsset=kt.state.paymentAsset,this.amount=kt.state.amount,this.unsubscribe.push(kt.subscribeKey("paymentAsset",e=>{this.paymentAsset=e}),kt.subscribeKey("amount",e=>{this.amount=e}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const e=l.getAllRequestedCaipNetworks().find(e=>e.caipNetworkId===this.paymentAsset.network);return S`<wui-flex
      alignItems="center"
      gap="1"
      .padding=${["1","2","1","1"]}
      class="transfers-badge"
    >
      <wui-image src=${M(this.paymentAsset.metadata.logoURI)} size="xl"></wui-image>
      <wui-text variant="lg-regular" color="primary">
        ${this.amount} ${this.paymentAsset.metadata.symbol}
      </wui-text>
      <wui-text variant="sm-regular" color="secondary">
        on ${e?.name??"Unknown"}
      </wui-text>
    </wui-flex>`}};ni.styles=[oi],ai([_()],ni.prototype,"paymentAsset",void 0),ai([_()],ni.prototype,"amount",void 0),ni=ai([q("w3m-pay-header")],ni);const ri=k`
  :host {
    height: 60px;
  }

  :host > wui-flex {
    box-sizing: border-box;
    background-color: var(--local-header-background-color);
  }

  wui-text {
    background-color: var(--local-header-background-color);
  }

  wui-flex.w3m-header-title {
    transform: translateY(0);
    opacity: 1;
  }

  wui-flex.w3m-header-title[view-direction='prev'] {
    animation:
      slide-down-out 120ms forwards ${({easings:e})=>e["ease-out-power-2"]},
      slide-down-in 120ms forwards ${({easings:e})=>e["ease-out-power-2"]};
    animation-delay: 0ms, 200ms;
  }

  wui-flex.w3m-header-title[view-direction='next'] {
    animation:
      slide-up-out 120ms forwards ${({easings:e})=>e["ease-out-power-2"]},
      slide-up-in 120ms forwards ${({easings:e})=>e["ease-out-power-2"]};
    animation-delay: 0ms, 200ms;
  }

  wui-icon-button[data-hidden='true'] {
    opacity: 0 !important;
    pointer-events: none;
  }

  @keyframes slide-up-out {
    from {
      transform: translateY(0px);
      opacity: 1;
    }
    to {
      transform: translateY(3px);
      opacity: 0;
    }
  }

  @keyframes slide-up-in {
    from {
      transform: translateY(-3px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slide-down-out {
    from {
      transform: translateY(0px);
      opacity: 1;
    }
    to {
      transform: translateY(-3px);
      opacity: 0;
    }
  }

  @keyframes slide-down-in {
    from {
      transform: translateY(3px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;var si=function(e,t,i,o){var a,n=arguments.length,r=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,i,r):a(t,i))||r);return n>3&&r&&Object.defineProperty(t,i,r),r};const ci=["SmartSessionList"],li={PayWithExchange:D.tokens.theme.foregroundPrimary};function di(){const e=i.state.data?.connector?.name,t=i.state.data?.wallet?.name,o=i.state.data?.network?.name,a=t??e,n=y.getConnectors(),r=1===n.length&&"w3m-email"===n[0]?.id,s=l.getAccountData()?.socialProvider;return{Connect:`Connect ${r?"Email":""} Wallet`,Create:"Create Wallet",ChooseAccountName:void 0,Account:void 0,AccountSettings:void 0,AllWallets:"All Wallets",ApproveTransaction:"Approve Transaction",BuyInProgress:"Buy",UsageExceeded:"Usage Exceeded",ConnectingExternal:a??"Connect Wallet",ConnectingWalletConnect:a??"WalletConnect",ConnectingWalletConnectBasic:"WalletConnect",ConnectingSiwe:"Sign In",Convert:"Convert",ConvertSelectToken:"Select token",ConvertPreview:"Preview Convert",Downloads:a?`Get ${a}`:"Downloads",EmailLogin:"Email Login",EmailVerifyOtp:"Confirm Email",EmailVerifyDevice:"Register Device",GetWallet:"Get a Wallet",Networks:"Choose Network",OnRampProviders:"Choose Provider",OnRampActivity:"Activity",OnRampTokenSelect:"Select Token",OnRampFiatSelect:"Select Currency",Pay:"How you pay",ProfileWallets:"Wallets",SwitchNetwork:o??"Switch Network",Transactions:"Activity",UnsupportedChain:"Switch Network",UpgradeEmailWallet:"Upgrade Your Wallet",UpdateEmailWallet:"Edit Email",UpdateEmailPrimaryOtp:"Confirm Current Email",UpdateEmailSecondaryOtp:"Confirm New Email",WhatIsABuy:"What is Buy?",RegisterAccountName:"Choose Name",RegisterAccountNameSuccess:"",WalletReceive:"Receive",WalletCompatibleNetworks:"Compatible Networks",Swap:"Swap",SwapSelectToken:"Select Token",SwapPreview:"Preview Swap",WalletSend:"Send",WalletSendPreview:"Review Send",WalletSendSelectToken:"Select Token",WalletSendConfirmed:"Confirmed",WhatIsANetwork:"What is a network?",WhatIsAWallet:"What is a Wallet?",ConnectWallets:"Connect Wallet",ConnectSocials:"All Socials",ConnectingSocial:s?s.charAt(0).toUpperCase()+s.slice(1):"Connect Social",ConnectingMultiChain:"Select Chain",ConnectingFarcaster:"Farcaster",SwitchActiveChain:"Switch Chain",SmartSessionCreated:void 0,SmartSessionList:"Smart Sessions",SIWXSignMessage:"Sign In",PayLoading:"Processing payment...",PayQuote:"Payment Quote",DataCapture:"Profile",DataCaptureOtpConfirm:"Confirm Email",FundWallet:"Fund Wallet",PayWithExchange:"Deposit from Exchange",PayWithExchangeSelectAsset:"Select Asset",SmartAccountSettings:"Smart Account Settings"}}let ui=class extends T{constructor(){super(),this.unsubscribe=[],this.heading=di()[i.state.view],this.network=l.state.activeCaipNetwork,this.networkImage=z.getNetworkImage(this.network),this.showBack=!1,this.prevHistoryLength=1,this.view=i.state.view,this.viewDirection="",this.unsubscribe.push(W.subscribeNetworkImages(()=>{this.networkImage=z.getNetworkImage(this.network)}),i.subscribeKey("view",e=>{setTimeout(()=>{this.view=e,this.heading=di()[e]},$e.ANIMATION_DURATIONS.HeaderText),this.onViewChange(),this.onHistoryChange()}),l.subscribeKey("activeCaipNetwork",e=>{this.network=e,this.networkImage=z.getNetworkImage(this.network)}))}disconnectCallback(){this.unsubscribe.forEach(e=>e())}render(){const e=li[i.state.view]??D.tokens.theme.backgroundPrimary;return this.style.setProperty("--local-header-background-color",e),S`
      <wui-flex
        .padding=${["0","4","0","4"]}
        justifyContent="space-between"
        alignItems="center"
      >
        ${this.leftHeaderTemplate()} ${this.titleTemplate()} ${this.rightHeaderTemplate()}
      </wui-flex>
    `}onWalletHelp(){r.sendEvent({type:"track",event:"CLICK_WALLET_HELP"}),i.push("WhatIsAWallet")}async onClose(){await ne.safeClose()}rightHeaderTemplate(){const e=R?.state?.features?.smartSessions;return"Account"===i.state.view&&e?S`<wui-flex>
      <wui-icon-button
        icon="clock"
        size="lg"
        iconSize="lg"
        type="neutral"
        variant="primary"
        @click=${()=>i.push("SmartSessionList")}
        data-testid="w3m-header-smart-sessions"
      ></wui-icon-button>
      ${this.closeButtonTemplate()}
    </wui-flex> `:this.closeButtonTemplate()}closeButtonTemplate(){return S`
      <wui-icon-button
        icon="close"
        size="lg"
        type="neutral"
        variant="primary"
        iconSize="lg"
        @click=${this.onClose.bind(this)}
        data-testid="w3m-header-close"
      ></wui-icon-button>
    `}titleTemplate(){if("PayQuote"===this.view)return S`<w3m-pay-header></w3m-pay-header>`;const e=ci.includes(this.view);return S`
      <wui-flex
        view-direction="${this.viewDirection}"
        class="w3m-header-title"
        alignItems="center"
        gap="2"
      >
        <wui-text
          display="inline"
          variant="lg-regular"
          color="primary"
          data-testid="w3m-header-text"
        >
          ${this.heading}
        </wui-text>
        ${e?S`<wui-tag variant="accent" size="md">Beta</wui-tag>`:null}
      </wui-flex>
    `}leftHeaderTemplate(){const{view:e}=i.state,t="Connect"===e,o=R.state.enableEmbedded,a="ApproveTransaction"===e,n="ConnectingSiwe"===e,r="Account"===e,s=R.state.enableNetworkSwitch,c=a||n||t&&o;return r&&s?S`<wui-select
        id="dynamic"
        data-testid="w3m-account-select-network"
        active-network=${M(this.network?.name)}
        @click=${this.onNetworks.bind(this)}
        imageSrc=${M(this.networkImage)}
      ></wui-select>`:this.showBack&&!c?S`<wui-icon-button
        data-testid="header-back"
        id="dynamic"
        icon="chevronLeft"
        size="lg"
        iconSize="lg"
        type="neutral"
        variant="primary"
        @click=${this.onGoBack.bind(this)}
      ></wui-icon-button>`:S`<wui-icon-button
      data-hidden=${!t}
      id="dynamic"
      icon="helpCircle"
      size="lg"
      iconSize="lg"
      type="neutral"
      variant="primary"
      @click=${this.onWalletHelp.bind(this)}
    ></wui-icon-button>`}onNetworks(){this.isAllowedNetworkSwitch()&&(r.sendEvent({type:"track",event:"CLICK_NETWORKS"}),i.push("Networks"))}isAllowedNetworkSwitch(){const e=l.getAllRequestedCaipNetworks(),t=!!e&&e.length>1,i=e?.find(({id:e})=>e===this.network?.id);return t||!i}onViewChange(){const{history:e}=i.state;let t=$e.VIEW_DIRECTION.Next;e.length<this.prevHistoryLength&&(t=$e.VIEW_DIRECTION.Prev),this.prevHistoryLength=e.length,this.viewDirection=t}async onHistoryChange(){const{history:e}=i.state,t=this.shadowRoot?.querySelector("#dynamic");e.length>1&&!this.showBack&&t?(await t.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.showBack=!0,t.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"})):e.length<=1&&this.showBack&&t&&(await t.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.showBack=!1,t.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"}))}onGoBack(){i.goBack()}};ui.styles=ri,si([H()],ui.prototype,"heading",void 0),si([H()],ui.prototype,"network",void 0),si([H()],ui.prototype,"networkImage",void 0),si([H()],ui.prototype,"showBack",void 0),si([H()],ui.prototype,"prevHistoryLength",void 0),si([H()],ui.prototype,"view",void 0),si([H()],ui.prototype,"viewDirection",void 0),ui=si([q("w3m-header")],ui);const pi=k`
  :host {
    display: flex;
    align-items: center;
    gap: ${({spacing:e})=>e[1]};
    padding: ${({spacing:e})=>e[2]} ${({spacing:e})=>e[3]}
      ${({spacing:e})=>e[2]} ${({spacing:e})=>e[2]};
    border-radius: ${({borderRadius:e})=>e[20]};
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    box-shadow:
      0px 0px 8px 0px rgba(0, 0, 0, 0.1),
      inset 0 0 0 1px ${({tokens:e})=>e.theme.borderPrimary};
    max-width: 320px;
  }

  wui-icon-box {
    border-radius: ${({borderRadius:e})=>e.round} !important;
    overflow: hidden;
  }

  wui-loading-spinner {
    padding: ${({spacing:e})=>e[1]};
    background-color: ${({tokens:e})=>e.core.foregroundAccent010};
    border-radius: ${({borderRadius:e})=>e.round} !important;
  }
`;var hi=function(e,t,i,o){var a,n=arguments.length,r=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,i,r):a(t,i))||r);return n>3&&r&&Object.defineProperty(t,i,r),r};let mi=class extends T{constructor(){super(...arguments),this.message="",this.variant="success"}render(){return S`
      ${this.templateIcon()}
      <wui-text variant="lg-regular" color="primary" data-testid="wui-snackbar-message"
        >${this.message}</wui-text
      >
    `}templateIcon(){return"loading"===this.variant?S`<wui-loading-spinner size="md" color="accent-primary"></wui-loading-spinner>`:S`<wui-icon-box
      size="md"
      color=${{success:"success",error:"error",warning:"warning",info:"default"}[this.variant]}
      icon=${{success:"checkmark",error:"warning",warning:"warningCircle",info:"info"}[this.variant]}
    ></wui-icon-box>`}};mi.styles=[x,pi],hi([_()],mi.prototype,"message",void 0),hi([_()],mi.prototype,"variant",void 0),mi=hi([q("wui-snackbar")],mi);const wi=U`
  :host {
    display: block;
    position: absolute;
    opacity: 0;
    pointer-events: none;
    top: 11px;
    left: 50%;
    width: max-content;
  }
`;var gi=function(e,t,i,o){var a,n=arguments.length,r=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,i,r):a(t,i))||r);return n>3&&r&&Object.defineProperty(t,i,r),r};let yi=class extends T{constructor(){super(),this.unsubscribe=[],this.timeout=void 0,this.open=o.state.open,this.unsubscribe.push(o.subscribeKey("open",e=>{this.open=e,this.onOpen()}))}disconnectedCallback(){clearTimeout(this.timeout),this.unsubscribe.forEach(e=>e())}render(){const{message:e,variant:t}=o.state;return S` <wui-snackbar message=${e} variant=${t}></wui-snackbar> `}onOpen(){clearTimeout(this.timeout),this.open?(this.animate([{opacity:0,transform:"translateX(-50%) scale(0.85)"},{opacity:1,transform:"translateX(-50%) scale(1)"}],{duration:150,fill:"forwards",easing:"ease"}),this.timeout&&clearTimeout(this.timeout),o.state.autoClose&&(this.timeout=setTimeout(()=>o.hide(),2500))):this.animate([{opacity:1,transform:"translateX(-50%) scale(1)"},{opacity:0,transform:"translateX(-50%) scale(0.85)"}],{duration:150,fill:"forwards",easing:"ease"})}};yi.styles=wi,gi([H()],yi.prototype,"open",void 0),yi=gi([q("w3m-snackbar")],yi);const fi=U`
  :host {
    width: 100%;
    display: block;
  }
`;var bi=function(e,t,i,o){var a,n=arguments.length,r=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,i,r):a(t,i))||r);return n>3&&r&&Object.defineProperty(t,i,r),r};let vi=class extends T{constructor(){super(),this.unsubscribe=[],this.text="",this.open=ae.state.open,this.unsubscribe.push(i.subscribeKey("view",()=>{ae.hide()}),b.subscribeKey("open",e=>{e||ae.hide()}),ae.subscribeKey("open",e=>{this.open=e}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),ae.hide()}render(){return S`
      <div
        @pointermove=${this.onMouseEnter.bind(this)}
        @pointerleave=${this.onMouseLeave.bind(this)}
      >
        ${this.renderChildren()}
      </div>
    `}renderChildren(){return S`<slot></slot> `}onMouseEnter(){const e=this.getBoundingClientRect();if(!this.open){const t=document.querySelector("w3m-modal"),i={width:e.width,height:e.height,left:e.left,top:e.top};if(t){const o=t.getBoundingClientRect();i.left=e.left-(window.innerWidth-o.width)/2,i.top=e.top-(window.innerHeight-o.height)/2}ae.showTooltip({message:this.text,triggerRect:i,variant:"shade"})}}onMouseLeave(e){this.contains(e.relatedTarget)||ae.hide()}};vi.styles=[fi],bi([_()],vi.prototype,"text",void 0),bi([H()],vi.prototype,"open",void 0),vi=bi([q("w3m-tooltip-trigger")],vi);const ki=k`
  :host {
    pointer-events: none;
  }

  :host > wui-flex {
    display: var(--w3m-tooltip-display);
    opacity: var(--w3m-tooltip-opacity);
    padding: 9px ${({spacing:e})=>e[3]} 10px ${({spacing:e})=>e[3]};
    border-radius: ${({borderRadius:e})=>e[3]};
    color: ${({tokens:e})=>e.theme.backgroundPrimary};
    position: absolute;
    top: var(--w3m-tooltip-top);
    left: var(--w3m-tooltip-left);
    transform: translate(calc(-50% + var(--w3m-tooltip-parent-width)), calc(-100% - 8px));
    max-width: calc(var(--apkt-modal-width) - ${({spacing:e})=>e[5]});
    transition: opacity ${({durations:e})=>e.lg}
      ${({easings:e})=>e["ease-out-power-2"]};
    will-change: opacity;
    opacity: 0;
    animation-duration: ${({durations:e})=>e.xl};
    animation-timing-function: ${({easings:e})=>e["ease-out-power-2"]};
    animation-name: fade-in;
    animation-fill-mode: forwards;
  }

  :host([data-variant='shade']) > wui-flex {
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
  }

  :host([data-variant='shade']) > wui-flex > wui-text {
    color: ${({tokens:e})=>e.theme.textSecondary};
  }

  :host([data-variant='fill']) > wui-flex {
    background-color: ${({tokens:e})=>e.theme.backgroundPrimary};
    border: 1px solid ${({tokens:e})=>e.theme.borderPrimary};
  }

  wui-icon {
    position: absolute;
    width: 12px !important;
    height: 4px !important;
    color: ${({tokens:e})=>e.theme.foregroundPrimary};
  }

  wui-icon[data-placement='top'] {
    bottom: 0px;
    left: 50%;
    transform: translate(-50%, 95%);
  }

  wui-icon[data-placement='bottom'] {
    top: 0;
    left: 50%;
    transform: translate(-50%, -95%) rotate(180deg);
  }

  wui-icon[data-placement='right'] {
    top: 50%;
    left: 0;
    transform: translate(-65%, -50%) rotate(90deg);
  }

  wui-icon[data-placement='left'] {
    top: 50%;
    right: 0%;
    transform: translate(65%, -50%) rotate(270deg);
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;var xi=function(e,t,i,o){var a,n=arguments.length,r=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,i,r):a(t,i))||r);return n>3&&r&&Object.defineProperty(t,i,r),r};let Ti=class extends T{constructor(){super(),this.unsubscribe=[],this.open=ae.state.open,this.message=ae.state.message,this.triggerRect=ae.state.triggerRect,this.variant=ae.state.variant,this.unsubscribe.push(ae.subscribe(e=>{this.open=e.open,this.message=e.message,this.triggerRect=e.triggerRect,this.variant=e.variant}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){this.dataset.variant=this.variant;const e=this.triggerRect.top,t=this.triggerRect.left;return this.style.cssText=`\n    --w3m-tooltip-top: ${e}px;\n    --w3m-tooltip-left: ${t}px;\n    --w3m-tooltip-parent-width: ${this.triggerRect.width/2}px;\n    --w3m-tooltip-display: ${this.open?"flex":"none"};\n    --w3m-tooltip-opacity: ${this.open?1:0};\n    `,S`<wui-flex>
      <wui-icon data-placement="top" size="inherit" name="cursor"></wui-icon>
      <wui-text color="primary" variant="sm-regular">${this.message}</wui-text>
    </wui-flex>`}};Ti.styles=[ki],xi([H()],Ti.prototype,"open",void 0),xi([H()],Ti.prototype,"message",void 0),xi([H()],Ti.prototype,"triggerRect",void 0),xi([H()],Ti.prototype,"variant",void 0),Ti=xi([q("w3m-tooltip")],Ti);const Si={getTabsByNamespace:e=>Boolean(e)&&e===n.CHAIN.EVM?!1===R.state.remoteFeatures?.activity?$e.ACCOUNT_TABS.filter(e=>"Activity"!==e.label):$e.ACCOUNT_TABS:[],isValidReownName:e=>/^[a-zA-Z0-9]+$/gu.test(e),isValidEmail:e=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/gu.test(e),validateReownName:e=>e.replace(/\^/gu,"").toLowerCase().replace(/[^a-zA-Z0-9]/gu,""),hasFooter(){const e=i.state.view;if($e.VIEWS_WITH_LEGAL_FOOTER.includes(e)){const{termsConditionsUrl:e,privacyPolicyUrl:t}=R.state,i=R.state.features?.legalCheckbox;return!(!e&&!t||i)}return $e.VIEWS_WITH_DEFAULT_FOOTER.includes(e)}},Ai=k`
  :host wui-ux-by-reown {
    padding-top: 0;
  }

  :host wui-ux-by-reown.branding-only {
    padding-top: ${({spacing:e})=>e[3]};
  }

  a {
    text-decoration: none;
    color: ${({tokens:e})=>e.core.textAccentPrimary};
    font-weight: 500;
  }
`;var $i=function(e,t,i,o){var a,n=arguments.length,r=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,i,r):a(t,i))||r);return n>3&&r&&Object.defineProperty(t,i,r),r};let Pi=class extends T{constructor(){super(),this.unsubscribe=[],this.remoteFeatures=R.state.remoteFeatures,this.unsubscribe.push(R.subscribeKey("remoteFeatures",e=>this.remoteFeatures=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const{termsConditionsUrl:e,privacyPolicyUrl:t}=R.state,i=R.state.features?.legalCheckbox;return!e&&!t||i?S`
        <wui-flex flexDirection="column"> ${this.reownBrandingTemplate(!0)} </wui-flex>
      `:S`
      <wui-flex flexDirection="column">
        <wui-flex .padding=${["4","3","3","3"]} justifyContent="center">
          <wui-text color="secondary" variant="md-regular" align="center">
            By connecting your wallet, you agree to our <br />
            ${this.termsTemplate()} ${this.andTemplate()} ${this.privacyTemplate()}
          </wui-text>
        </wui-flex>
        ${this.reownBrandingTemplate()}
      </wui-flex>
    `}andTemplate(){const{termsConditionsUrl:e,privacyPolicyUrl:t}=R.state;return e&&t?"and":""}termsTemplate(){const{termsConditionsUrl:e}=R.state;return e?S`<a href=${e} target="_blank" rel="noopener noreferrer"
      >Terms of Service</a
    >`:null}privacyTemplate(){const{privacyPolicyUrl:e}=R.state;return e?S`<a href=${e} target="_blank" rel="noopener noreferrer"
      >Privacy Policy</a
    >`:null}reownBrandingTemplate(e=!1){return this.remoteFeatures?.reownBranding?e?S`<wui-ux-by-reown class="branding-only"></wui-ux-by-reown>`:S`<wui-ux-by-reown></wui-ux-by-reown>`:null}};Pi.styles=[Ai],$i([H()],Pi.prototype,"remoteFeatures",void 0),Pi=$i([q("w3m-legal-footer")],Pi);const Ci=U``;var Ii=function(e,t,i,o){var a,n=arguments.length,r=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,i,r):a(t,i))||r);return n>3&&r&&Object.defineProperty(t,i,r),r};let Ei=class extends T{render(){const{termsConditionsUrl:e,privacyPolicyUrl:t}=R.state;return e||t?S`
      <wui-flex
        .padding=${["4","3","3","3"]}
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap="3"
      >
        <wui-text color="secondary" variant="md-regular" align="center">
          We work with the best providers to give you the lowest fees and best support. More options
          coming soon!
        </wui-text>

        ${this.howDoesItWorkTemplate()}
      </wui-flex>
    `:null}howDoesItWorkTemplate(){return S` <wui-link @click=${this.onWhatIsBuy.bind(this)}>
      <wui-icon size="xs" color="accent-primary" slot="iconLeft" name="helpCircle"></wui-icon>
      How does it work?
    </wui-link>`}onWhatIsBuy(){r.sendEvent({type:"track",event:"SELECT_WHAT_IS_A_BUY",properties:{isSmartAccount:s(l.state.activeChain)===c.ACCOUNT_TYPES.SMART_ACCOUNT}}),i.push("WhatIsABuy")}};Ei.styles=[Ci],Ei=Ii([q("w3m-onramp-providers-footer")],Ei);const Ni=k`
  :host {
    display: block;
  }

  div.container {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    height: auto;
    display: block;
  }

  div.container[status='hide'] {
    animation: fade-out;
    animation-duration: var(--apkt-duration-dynamic);
    animation-timing-function: ${({easings:e})=>e["ease-out-power-2"]};
    animation-fill-mode: both;
    animation-delay: 0s;
  }

  div.container[status='show'] {
    animation: fade-in;
    animation-duration: var(--apkt-duration-dynamic);
    animation-timing-function: ${({easings:e})=>e["ease-out-power-2"]};
    animation-fill-mode: both;
    animation-delay: var(--apkt-duration-dynamic);
  }

  @keyframes fade-in {
    from {
      opacity: 0;
      filter: blur(6px);
    }
    to {
      opacity: 1;
      filter: blur(0px);
    }
  }

  @keyframes fade-out {
    from {
      opacity: 1;
      filter: blur(0px);
    }
    to {
      opacity: 0;
      filter: blur(6px);
    }
  }
`;var Ri=function(e,t,i,o){var a,n=arguments.length,r=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,i,r):a(t,i))||r);return n>3&&r&&Object.defineProperty(t,i,r),r};let Oi=class extends T{constructor(){super(...arguments),this.resizeObserver=void 0,this.unsubscribe=[],this.status="hide",this.view=i.state.view}firstUpdated(){this.status=Si.hasFooter()?"show":"hide",this.unsubscribe.push(i.subscribeKey("view",e=>{if(this.view=e,this.status=Si.hasFooter()?"show":"hide","hide"===this.status){document.documentElement.style.setProperty("--apkt-footer-height","0px")}})),this.resizeObserver=new ResizeObserver(e=>{for(const t of e)if(t.target===this.getWrapper()){const e=`${t.contentRect.height}px`;document.documentElement.style.setProperty("--apkt-footer-height",e)}}),this.resizeObserver.observe(this.getWrapper())}render(){return S`
      <div class="container" status=${this.status}>${this.templatePageContainer()}</div>
    `}templatePageContainer(){return Si.hasFooter()?S` ${this.templateFooter()}`:null}templateFooter(){switch(this.view){case"Networks":return this.templateNetworksFooter();case"Connect":case"ConnectWallets":case"OnRampFiatSelect":case"OnRampTokenSelect":return S`<w3m-legal-footer></w3m-legal-footer>`;case"OnRampProviders":return S`<w3m-onramp-providers-footer></w3m-onramp-providers-footer>`;default:return null}}templateNetworksFooter(){return S` <wui-flex
      class="footer-in"
      padding="3"
      flexDirection="column"
      gap="3"
      alignItems="center"
    >
      <wui-text variant="md-regular" color="secondary" align="center">
        Your connected wallet may not support some of the networks available for this dApp
      </wui-text>
      <wui-link @click=${this.onNetworkHelp.bind(this)}>
        <wui-icon size="sm" color="accent-primary" slot="iconLeft" name="helpCircle"></wui-icon>
        What is a network
      </wui-link>
    </wui-flex>`}onNetworkHelp(){r.sendEvent({type:"track",event:"CLICK_NETWORK_HELP"}),i.push("WhatIsANetwork")}getWrapper(){return this.shadowRoot?.querySelector("div.container")}};Oi.styles=[Ni],Ri([H()],Oi.prototype,"status",void 0),Ri([H()],Oi.prototype,"view",void 0),Oi=Ri([q("w3m-footer")],Oi);const zi=k`
  :host {
    display: block;
    width: inherit;
  }
`;var Di=function(e,t,i,o){var a,n=arguments.length,r=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,i,r):a(t,i))||r);return n>3&&r&&Object.defineProperty(t,i,r),r};let Ui=class extends T{constructor(){super(),this.unsubscribe=[],this.viewState=i.state.view,this.history=i.state.history.join(","),this.unsubscribe.push(i.subscribeKey("view",()=>{this.history=i.state.history.join(","),document.documentElement.style.setProperty("--apkt-duration-dynamic","var(--apkt-durations-lg)")}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),document.documentElement.style.setProperty("--apkt-duration-dynamic","0s")}render(){return S`${this.templatePageContainer()}`}templatePageContainer(){return S`<w3m-router-container
      history=${this.history}
      .setView=${()=>{this.viewState=i.state.view}}
    >
      ${this.viewTemplate(this.viewState)}
    </w3m-router-container>`}viewTemplate(e){switch(e){case"AccountSettings":return S`<w3m-account-settings-view></w3m-account-settings-view>`;case"Account":return S`<w3m-account-view></w3m-account-view>`;case"AllWallets":return S`<w3m-all-wallets-view></w3m-all-wallets-view>`;case"ApproveTransaction":return S`<w3m-approve-transaction-view></w3m-approve-transaction-view>`;case"BuyInProgress":return S`<w3m-buy-in-progress-view></w3m-buy-in-progress-view>`;case"ChooseAccountName":return S`<w3m-choose-account-name-view></w3m-choose-account-name-view>`;case"Connect":default:return S`<w3m-connect-view></w3m-connect-view>`;case"Create":return S`<w3m-connect-view walletGuide="explore"></w3m-connect-view>`;case"ConnectingWalletConnect":return S`<w3m-connecting-wc-view></w3m-connecting-wc-view>`;case"ConnectingWalletConnectBasic":return S`<w3m-connecting-wc-basic-view></w3m-connecting-wc-basic-view>`;case"ConnectingExternal":return S`<w3m-connecting-external-view></w3m-connecting-external-view>`;case"ConnectingSiwe":return S`<w3m-connecting-siwe-view></w3m-connecting-siwe-view>`;case"ConnectWallets":return S`<w3m-connect-wallets-view></w3m-connect-wallets-view>`;case"ConnectSocials":return S`<w3m-connect-socials-view></w3m-connect-socials-view>`;case"ConnectingSocial":return S`<w3m-connecting-social-view></w3m-connecting-social-view>`;case"DataCapture":return S`<w3m-data-capture-view></w3m-data-capture-view>`;case"DataCaptureOtpConfirm":return S`<w3m-data-capture-otp-confirm-view></w3m-data-capture-otp-confirm-view>`;case"Downloads":return S`<w3m-downloads-view></w3m-downloads-view>`;case"EmailLogin":return S`<w3m-email-login-view></w3m-email-login-view>`;case"EmailVerifyOtp":return S`<w3m-email-verify-otp-view></w3m-email-verify-otp-view>`;case"EmailVerifyDevice":return S`<w3m-email-verify-device-view></w3m-email-verify-device-view>`;case"GetWallet":return S`<w3m-get-wallet-view></w3m-get-wallet-view>`;case"Networks":return S`<w3m-networks-view></w3m-networks-view>`;case"SwitchNetwork":return S`<w3m-network-switch-view></w3m-network-switch-view>`;case"ProfileWallets":return S`<w3m-profile-wallets-view></w3m-profile-wallets-view>`;case"Transactions":return S`<w3m-transactions-view></w3m-transactions-view>`;case"OnRampProviders":return S`<w3m-onramp-providers-view></w3m-onramp-providers-view>`;case"OnRampTokenSelect":return S`<w3m-onramp-token-select-view></w3m-onramp-token-select-view>`;case"OnRampFiatSelect":return S`<w3m-onramp-fiat-select-view></w3m-onramp-fiat-select-view>`;case"UpgradeEmailWallet":return S`<w3m-upgrade-wallet-view></w3m-upgrade-wallet-view>`;case"UpdateEmailWallet":return S`<w3m-update-email-wallet-view></w3m-update-email-wallet-view>`;case"UpdateEmailPrimaryOtp":return S`<w3m-update-email-primary-otp-view></w3m-update-email-primary-otp-view>`;case"UpdateEmailSecondaryOtp":return S`<w3m-update-email-secondary-otp-view></w3m-update-email-secondary-otp-view>`;case"UnsupportedChain":return S`<w3m-unsupported-chain-view></w3m-unsupported-chain-view>`;case"Swap":return S`<w3m-swap-view></w3m-swap-view>`;case"SwapSelectToken":return S`<w3m-swap-select-token-view></w3m-swap-select-token-view>`;case"SwapPreview":return S`<w3m-swap-preview-view></w3m-swap-preview-view>`;case"WalletSend":return S`<w3m-wallet-send-view></w3m-wallet-send-view>`;case"WalletSendSelectToken":return S`<w3m-wallet-send-select-token-view></w3m-wallet-send-select-token-view>`;case"WalletSendPreview":return S`<w3m-wallet-send-preview-view></w3m-wallet-send-preview-view>`;case"WalletSendConfirmed":return S`<w3m-send-confirmed-view></w3m-send-confirmed-view>`;case"WhatIsABuy":return S`<w3m-what-is-a-buy-view></w3m-what-is-a-buy-view>`;case"WalletReceive":return S`<w3m-wallet-receive-view></w3m-wallet-receive-view>`;case"WalletCompatibleNetworks":return S`<w3m-wallet-compatible-networks-view></w3m-wallet-compatible-networks-view>`;case"WhatIsAWallet":return S`<w3m-what-is-a-wallet-view></w3m-what-is-a-wallet-view>`;case"ConnectingMultiChain":return S`<w3m-connecting-multi-chain-view></w3m-connecting-multi-chain-view>`;case"WhatIsANetwork":return S`<w3m-what-is-a-network-view></w3m-what-is-a-network-view>`;case"ConnectingFarcaster":return S`<w3m-connecting-farcaster-view></w3m-connecting-farcaster-view>`;case"SwitchActiveChain":return S`<w3m-switch-active-chain-view></w3m-switch-active-chain-view>`;case"RegisterAccountName":return S`<w3m-register-account-name-view></w3m-register-account-name-view>`;case"RegisterAccountNameSuccess":return S`<w3m-register-account-name-success-view></w3m-register-account-name-success-view>`;case"SmartSessionCreated":return S`<w3m-smart-session-created-view></w3m-smart-session-created-view>`;case"SmartSessionList":return S`<w3m-smart-session-list-view></w3m-smart-session-list-view>`;case"SIWXSignMessage":return S`<w3m-siwx-sign-message-view></w3m-siwx-sign-message-view>`;case"Pay":return S`<w3m-pay-view></w3m-pay-view>`;case"PayLoading":return S`<w3m-pay-loading-view></w3m-pay-loading-view>`;case"PayQuote":return S`<w3m-pay-quote-view></w3m-pay-quote-view>`;case"FundWallet":return S`<w3m-fund-wallet-view></w3m-fund-wallet-view>`;case"PayWithExchange":return S`<w3m-deposit-from-exchange-view></w3m-deposit-from-exchange-view>`;case"PayWithExchangeSelectAsset":return S`<w3m-deposit-from-exchange-select-asset-view></w3m-deposit-from-exchange-select-asset-view>`;case"UsageExceeded":return S`<w3m-usage-exceeded-view></w3m-usage-exceeded-view>`;case"SmartAccountSettings":return S`<w3m-smart-account-settings-view></w3m-smart-account-settings-view>`}}};Ui.styles=[zi],Di([H()],Ui.prototype,"viewState",void 0),Di([H()],Ui.prototype,"history",void 0),Ui=Di([q("w3m-router")],Ui);const Wi=k`
  :host {
    z-index: ${({tokens:e})=>e.core.zIndex};
    display: block;
    backface-visibility: hidden;
    will-change: opacity;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    opacity: 0;
    background-color: ${({tokens:e})=>e.theme.overlay};
    backdrop-filter: blur(0px);
    transition:
      opacity ${({durations:e})=>e.lg} ${({easings:e})=>e["ease-out-power-2"]},
      backdrop-filter ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-2"]};
    will-change: opacity;
  }

  :host(.open) {
    opacity: 1;
    backdrop-filter: blur(8px);
  }

  :host(.appkit-modal) {
    position: relative;
    pointer-events: unset;
    background: none;
    width: 100%;
    opacity: 1;
  }

  wui-card {
    max-width: var(--apkt-modal-width);
    width: 100%;
    position: relative;
    outline: none;
    transform: translateY(4px);
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
    transition:
      transform ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-2"]},
      border-radius ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-1"]},
      background-color ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-1"]},
      box-shadow ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-1"]};
    will-change: border-radius, background-color, transform, box-shadow;
    background-color: ${({tokens:e})=>e.theme.backgroundPrimary};
    padding: var(--local-modal-padding);
    box-sizing: border-box;
  }

  :host(.open) wui-card {
    transform: translateY(0px);
  }

  wui-card::before {
    z-index: 1;
    pointer-events: none;
    content: '';
    position: absolute;
    inset: 0;
    border-radius: clamp(0px, var(--apkt-borderRadius-8), 44px);
    transition: box-shadow ${({durations:e})=>e.lg}
      ${({easings:e})=>e["ease-out-power-2"]};
    transition-delay: ${({durations:e})=>e.md};
    will-change: box-shadow;
  }

  :host([data-mobile-fullscreen='true']) wui-card::before {
    border-radius: 0px;
  }

  :host([data-border='true']) wui-card::before {
    box-shadow: inset 0px 0px 0px 4px ${({tokens:e})=>e.theme.foregroundSecondary};
  }

  :host([data-border='false']) wui-card::before {
    box-shadow: inset 0px 0px 0px 1px ${({tokens:e})=>e.theme.borderPrimaryDark};
  }

  :host([data-border='true']) wui-card {
    animation:
      fade-in ${({durations:e})=>e.lg} ${({easings:e})=>e["ease-out-power-2"]},
      card-background-border var(--apkt-duration-dynamic)
        ${({easings:e})=>e["ease-out-power-2"]};
    animation-fill-mode: backwards, both;
    animation-delay: var(--apkt-duration-dynamic);
  }

  :host([data-border='false']) wui-card {
    animation:
      fade-in ${({durations:e})=>e.lg} ${({easings:e})=>e["ease-out-power-2"]},
      card-background-default var(--apkt-duration-dynamic)
        ${({easings:e})=>e["ease-out-power-2"]};
    animation-fill-mode: backwards, both;
    animation-delay: 0s;
  }

  :host(.appkit-modal) wui-card {
    max-width: var(--apkt-modal-width);
  }

  wui-card[shake='true'] {
    animation:
      fade-in ${({durations:e})=>e.lg} ${({easings:e})=>e["ease-out-power-2"]},
      w3m-shake ${({durations:e})=>e.xl}
        ${({easings:e})=>e["ease-out-power-2"]};
  }

  wui-flex {
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  @media (max-height: 700px) and (min-width: 431px) {
    wui-flex {
      align-items: flex-start;
    }

    wui-card {
      margin: var(--apkt-spacing-6) 0px;
    }
  }

  @media (max-width: 430px) {
    :host([data-mobile-fullscreen='true']) {
      height: 100dvh;
    }
    :host([data-mobile-fullscreen='true']) wui-flex {
      align-items: stretch;
    }
    :host([data-mobile-fullscreen='true']) wui-card {
      max-width: 100%;
      height: 100%;
      border-radius: 0;
      border: none;
    }
    :host(:not([data-mobile-fullscreen='true'])) wui-flex {
      align-items: flex-end;
    }

    :host(:not([data-mobile-fullscreen='true'])) wui-card {
      max-width: 100%;
      border-bottom: none;
    }

    :host(:not([data-mobile-fullscreen='true'])) wui-card[data-embedded='true'] {
      border-bottom-left-radius: clamp(0px, var(--apkt-borderRadius-8), 44px);
      border-bottom-right-radius: clamp(0px, var(--apkt-borderRadius-8), 44px);
    }

    :host(:not([data-mobile-fullscreen='true'])) wui-card:not([data-embedded='true']) {
      border-bottom-left-radius: 0px;
      border-bottom-right-radius: 0px;
    }

    wui-card[shake='true'] {
      animation: w3m-shake 0.5s ${({easings:e})=>e["ease-out-power-2"]};
    }
  }

  @keyframes fade-in {
    0% {
      transform: scale(0.99) translateY(4px);
    }
    100% {
      transform: scale(1) translateY(0);
    }
  }

  @keyframes w3m-shake {
    0% {
      transform: scale(1) rotate(0deg);
    }
    20% {
      transform: scale(1) rotate(-1deg);
    }
    40% {
      transform: scale(1) rotate(1.5deg);
    }
    60% {
      transform: scale(1) rotate(-1.5deg);
    }
    80% {
      transform: scale(1) rotate(1deg);
    }
    100% {
      transform: scale(1) rotate(0deg);
    }
  }

  @keyframes card-background-border {
    from {
      background-color: ${({tokens:e})=>e.theme.backgroundPrimary};
    }
    to {
      background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
    }
  }

  @keyframes card-background-default {
    from {
      background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
    }
    to {
      background-color: ${({tokens:e})=>e.theme.backgroundPrimary};
    }
  }
`;var ji=function(e,t,i,o){var a,n=arguments.length,r=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,i,r):a(t,i))||r);return n>3&&r&&Object.defineProperty(t,i,r),r};const Bi="scroll-lock",Fi={PayWithExchange:"0",PayWithExchangeSelectAsset:"0",Pay:"0",PayQuote:"0",PayLoading:"0"};class Li extends T{constructor(){super(),this.unsubscribe=[],this.abortController=void 0,this.hasPrefetched=!1,this.enableEmbedded=R.state.enableEmbedded,this.open=b.state.open,this.caipAddress=l.state.activeCaipAddress,this.caipNetwork=l.state.activeCaipNetwork,this.shake=b.state.shake,this.filterByNamespace=y.state.filterByNamespace,this.padding=D.spacing[1],this.mobileFullScreen=R.state.enableMobileFullScreen,this.initializeTheming(),j.prefetchAnalyticsConfig(),this.unsubscribe.push(b.subscribeKey("open",e=>e?this.onOpen():this.onClose()),b.subscribeKey("shake",e=>this.shake=e),l.subscribeKey("activeCaipNetwork",e=>this.onNewNetwork(e)),l.subscribeKey("activeCaipAddress",e=>this.onNewAddress(e)),R.subscribeKey("enableEmbedded",e=>this.enableEmbedded=e),y.subscribeKey("filterByNamespace",e=>{this.filterByNamespace===e||l.getAccountData(e)?.caipAddress||(j.fetchRecommendedWallets(),this.filterByNamespace=e)}),i.subscribeKey("view",()=>{this.dataset.border=Si.hasFooter()?"true":"false",this.padding=Fi[i.state.view]??D.spacing[1]}))}firstUpdated(){if(this.dataset.border=Si.hasFooter()?"true":"false",this.mobileFullScreen&&this.setAttribute("data-mobile-fullscreen","true"),this.caipAddress){if(this.enableEmbedded)return b.close(),void this.prefetch();this.onNewAddress(this.caipAddress)}this.open&&this.onOpen(),this.enableEmbedded&&this.prefetch()}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),this.onRemoveKeyboardListener()}render(){return this.style.setProperty("--local-modal-padding",this.padding),this.enableEmbedded?S`${this.contentTemplate()}
        <w3m-tooltip></w3m-tooltip> `:this.open?S`
          <wui-flex @click=${this.onOverlayClick.bind(this)} data-testid="w3m-modal-overlay">
            ${this.contentTemplate()}
          </wui-flex>
          <w3m-tooltip></w3m-tooltip>
        `:null}contentTemplate(){return S` <wui-card
      shake="${this.shake}"
      data-embedded="${M(this.enableEmbedded)}"
      role="alertdialog"
      aria-modal="true"
      tabindex="0"
      data-testid="w3m-modal-card"
    >
      <w3m-header></w3m-header>
      <w3m-router></w3m-router>
      <w3m-footer></w3m-footer>
      <w3m-snackbar></w3m-snackbar>
      <w3m-alertbar></w3m-alertbar>
    </wui-card>`}async onOverlayClick(e){if(e.target===e.currentTarget){if(this.mobileFullScreen)return;await this.handleClose()}}async handleClose(){await ne.safeClose()}initializeTheming(){const{themeVariables:e,themeMode:t}=B.state,i=K.getColorTheme(t);F(e,i)}onClose(){this.open=!1,this.classList.remove("open"),this.onScrollUnlock(),o.hide(),this.onRemoveKeyboardListener()}onOpen(){this.open=!0,this.classList.add("open"),this.onScrollLock(),this.onAddKeyboardListener()}onScrollLock(){const e=document.createElement("style");e.dataset.w3m=Bi,e.textContent="\n      body {\n        touch-action: none;\n        overflow: hidden;\n        overscroll-behavior: contain;\n      }\n      w3m-modal {\n        pointer-events: auto;\n      }\n    ",document.head.appendChild(e)}onScrollUnlock(){const e=document.head.querySelector(`style[data-w3m="${Bi}"]`);e&&e.remove()}onAddKeyboardListener(){this.abortController=new AbortController;const e=this.shadowRoot?.querySelector("wui-card");e?.focus(),window.addEventListener("keydown",t=>{if("Escape"===t.key)this.handleClose();else if("Tab"===t.key){const{tagName:i}=t.target;!i||i.includes("W3M-")||i.includes("WUI-")||e?.focus()}},this.abortController)}onRemoveKeyboardListener(){this.abortController?.abort(),this.abortController=void 0}async onNewAddress(e){const t=l.state.isSwitchingNamespace,o="ProfileWallets"===i.state.view;!e&&!t&&!o&&b.close(),await v.initializeIfEnabled(e),this.caipAddress=e,l.setIsSwitchingNamespace(!1)}onNewNetwork(e){const t=this.caipNetwork,o=t?.caipNetworkId?.toString(),a=e?.caipNetworkId?.toString(),n=o!==a,r="UnsupportedChain"===i.state.view,s=b.state.open;let c=!1;this.enableEmbedded&&"SwitchNetwork"===i.state.view&&(c=!0),n&&ie.resetState(),s&&r&&(c=!0),c&&"SIWXSignMessage"!==i.state.view&&i.goBack(),this.caipNetwork=e}prefetch(){this.hasPrefetched||(j.prefetch(),j.fetchWalletsByPage({page:1}),this.hasPrefetched=!0)}}Li.styles=Wi,ji([_({type:Boolean})],Li.prototype,"enableEmbedded",void 0),ji([H()],Li.prototype,"open",void 0),ji([H()],Li.prototype,"caipAddress",void 0),ji([H()],Li.prototype,"caipNetwork",void 0),ji([H()],Li.prototype,"shake",void 0),ji([H()],Li.prototype,"filterByNamespace",void 0),ji([H()],Li.prototype,"padding",void 0),ji([H()],Li.prototype,"mobileFullScreen",void 0);let qi=class extends Li{};qi=ji([q("w3m-modal")],qi);let _i=class extends Li{};_i=ji([q("appkit-modal")],_i);const Mi=k`
  .icon-box {
    width: 64px;
    height: 64px;
    border-radius: ${({borderRadius:e})=>e[5]};
    background-color: ${({colors:e})=>e.semanticError010};
  }
`;var Hi=function(e,t,i,o){var a,n=arguments.length,r=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,i,r):a(t,i))||r);return n>3&&r&&Object.defineProperty(t,i,r),r};let Vi=class extends T{constructor(){super()}render(){return S`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        gap="4"
        .padding="${["1","3","4","3"]}"
      >
        <wui-flex justifyContent="center" alignItems="center" class="icon-box">
          <wui-icon size="xxl" color="error" name="warningCircle"></wui-icon>
        </wui-flex>

        <wui-text variant="lg-medium" color="primary" align="center">
          The app isn't responding as expected
        </wui-text>
        <wui-text variant="md-regular" color="secondary" align="center">
          Try again or reach out to the app team for help.
        </wui-text>

        <wui-button
          variant="neutral-secondary"
          size="md"
          @click=${this.onTryAgainClick.bind(this)}
          data-testid="w3m-usage-exceeded-button"
        >
          <wui-icon color="inherit" slot="iconLeft" name="refresh"></wui-icon>
          Try Again
        </wui-button>
      </wui-flex>
    `}onTryAgainClick(){i.goBack()}};Vi.styles=Mi,Vi=Hi([q("w3m-usage-exceeded-view")],Vi);const Ki=k`
  :host {
    width: 100%;
  }
`;var Qi=function(e,t,i,o){var a,n=arguments.length,r=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,i,r):a(t,i))||r);return n>3&&r&&Object.defineProperty(t,i,r),r};let Gi=class extends T{constructor(){super(...arguments),this.hasImpressionSent=!1,this.walletImages=[],this.imageSrc="",this.name="",this.size="md",this.tabIdx=void 0,this.disabled=!1,this.showAllWallets=!1,this.loading=!1,this.loadingSpinnerColor="accent-100",this.rdnsId="",this.displayIndex=void 0,this.walletRank=void 0,this.namespaces=[]}connectedCallback(){super.connectedCallback()}disconnectedCallback(){super.disconnectedCallback(),this.cleanupIntersectionObserver()}updated(e){super.updated(e),(e.has("name")||e.has("imageSrc")||e.has("walletRank"))&&(this.hasImpressionSent=!1);e.has("walletRank")&&this.walletRank&&!this.intersectionObserver&&this.setupIntersectionObserver()}setupIntersectionObserver(){this.intersectionObserver=new IntersectionObserver(e=>{e.forEach(e=>{!e.isIntersecting||this.loading||this.hasImpressionSent||this.sendImpressionEvent()})},{threshold:.1}),this.intersectionObserver.observe(this)}cleanupIntersectionObserver(){this.intersectionObserver&&(this.intersectionObserver.disconnect(),this.intersectionObserver=void 0)}sendImpressionEvent(){this.name&&!this.hasImpressionSent&&this.walletRank&&(this.hasImpressionSent=!0,(this.rdnsId||this.name)&&r.sendWalletImpressionEvent({name:this.name,walletRank:this.walletRank,rdnsId:this.rdnsId,view:i.state.view,displayIndex:this.displayIndex}))}handleGetWalletNamespaces(){return Object.keys(L.state.adapters).length>1?this.namespaces:[]}render(){return S`
      <wui-list-wallet
        .walletImages=${this.walletImages}
        imageSrc=${M(this.imageSrc)}
        name=${this.name}
        size=${M(this.size)}
        tagLabel=${M(this.tagLabel)}
        .tagVariant=${this.tagVariant}
        .walletIcon=${this.walletIcon}
        .tabIdx=${this.tabIdx}
        .disabled=${this.disabled}
        .showAllWallets=${this.showAllWallets}
        .loading=${this.loading}
        loadingSpinnerColor=${this.loadingSpinnerColor}
        .namespaces=${this.handleGetWalletNamespaces()}
      ></wui-list-wallet>
    `}};Gi.styles=Ki,Qi([_({type:Array})],Gi.prototype,"walletImages",void 0),Qi([_()],Gi.prototype,"imageSrc",void 0),Qi([_()],Gi.prototype,"name",void 0),Qi([_()],Gi.prototype,"size",void 0),Qi([_()],Gi.prototype,"tagLabel",void 0),Qi([_()],Gi.prototype,"tagVariant",void 0),Qi([_()],Gi.prototype,"walletIcon",void 0),Qi([_()],Gi.prototype,"tabIdx",void 0),Qi([_({type:Boolean})],Gi.prototype,"disabled",void 0),Qi([_({type:Boolean})],Gi.prototype,"showAllWallets",void 0),Qi([_({type:Boolean})],Gi.prototype,"loading",void 0),Qi([_({type:String})],Gi.prototype,"loadingSpinnerColor",void 0),Qi([_()],Gi.prototype,"rdnsId",void 0),Qi([_()],Gi.prototype,"displayIndex",void 0),Qi([_()],Gi.prototype,"walletRank",void 0),Qi([_({type:Array})],Gi.prototype,"namespaces",void 0),Gi=Qi([q("w3m-list-wallet")],Gi);const Yi=k`
  :host {
    --local-duration-height: 0s;
    --local-duration: ${({durations:e})=>e.lg};
    --local-transition: ${({easings:e})=>e["ease-out-power-2"]};
  }

  .container {
    display: block;
    overflow: hidden;
    overflow: hidden;
    position: relative;
    height: var(--local-container-height);
    transition: height var(--local-duration-height) var(--local-transition);
    will-change: height, padding-bottom;
  }

  .container[data-mobile-fullscreen='true'] {
    overflow: scroll;
  }

  .page {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: auto;
    width: inherit;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    background-color: ${({tokens:e})=>e.theme.backgroundPrimary};
    border-bottom-left-radius: var(--local-border-bottom-radius);
    border-bottom-right-radius: var(--local-border-bottom-radius);
    transition: border-bottom-left-radius var(--local-duration) var(--local-transition);
  }

  .page[data-mobile-fullscreen='true'] {
    height: 100%;
  }

  .page-content {
    display: flex;
    flex-direction: column;
    min-height: 100%;
  }

  .footer {
    height: var(--apkt-footer-height);
  }

  div.page[view-direction^='prev-'] .page-content {
    animation:
      slide-left-out var(--local-duration) forwards var(--local-transition),
      slide-left-in var(--local-duration) forwards var(--local-transition);
    animation-delay: 0ms, var(--local-duration, ${({durations:e})=>e.lg});
  }

  div.page[view-direction^='next-'] .page-content {
    animation:
      slide-right-out var(--local-duration) forwards var(--local-transition),
      slide-right-in var(--local-duration) forwards var(--local-transition);
    animation-delay: 0ms, var(--local-duration, ${({durations:e})=>e.lg});
  }

  @keyframes slide-left-out {
    from {
      transform: translateX(0px) scale(1);
      opacity: 1;
      filter: blur(0px);
    }
    to {
      transform: translateX(8px) scale(0.99);
      opacity: 0;
      filter: blur(4px);
    }
  }

  @keyframes slide-left-in {
    from {
      transform: translateX(-8px) scale(0.99);
      opacity: 0;
      filter: blur(4px);
    }
    to {
      transform: translateX(0) translateY(0) scale(1);
      opacity: 1;
      filter: blur(0px);
    }
  }

  @keyframes slide-right-out {
    from {
      transform: translateX(0px) scale(1);
      opacity: 1;
      filter: blur(0px);
    }
    to {
      transform: translateX(-8px) scale(0.99);
      opacity: 0;
      filter: blur(4px);
    }
  }

  @keyframes slide-right-in {
    from {
      transform: translateX(8px) scale(0.99);
      opacity: 0;
      filter: blur(4px);
    }
    to {
      transform: translateX(0) translateY(0) scale(1);
      opacity: 1;
      filter: blur(0px);
    }
  }
`;var Xi=function(e,t,i,o){var a,n=arguments.length,r=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(t,i,r):a(t,i))||r);return n>3&&r&&Object.defineProperty(t,i,r),r};let Zi=class extends T{constructor(){super(...arguments),this.resizeObserver=void 0,this.transitionDuration="0.15s",this.transitionFunction="",this.history="",this.view="",this.setView=void 0,this.viewDirection="",this.historyState="",this.previousHeight="0px",this.mobileFullScreen=R.state.enableMobileFullScreen,this.onViewportResize=()=>{this.updateContainerHeight()}}updated(e){if(e.has("history")){const e=this.history;""!==this.historyState&&this.historyState!==e&&this.onViewChange(e)}e.has("transitionDuration")&&this.style.setProperty("--local-duration",this.transitionDuration),e.has("transitionFunction")&&this.style.setProperty("--local-transition",this.transitionFunction)}firstUpdated(){this.transitionFunction&&this.style.setProperty("--local-transition",this.transitionFunction),this.style.setProperty("--local-duration",this.transitionDuration),this.historyState=this.history,this.resizeObserver=new ResizeObserver(e=>{for(const t of e)if(t.target===this.getWrapper()){let e=t.contentRect.height;const i=parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--apkt-footer-height")||"0");if(this.mobileFullScreen){e=(window.visualViewport?.height||window.innerHeight)-this.getHeaderHeight()-i,this.style.setProperty("--local-border-bottom-radius","0px")}else{e=e+i,this.style.setProperty("--local-border-bottom-radius",i?"var(--apkt-borderRadius-5)":"0px")}this.style.setProperty("--local-container-height",`${e}px`),"0px"!==this.previousHeight&&this.style.setProperty("--local-duration-height",this.transitionDuration),this.previousHeight=`${e}px`}}),this.resizeObserver.observe(this.getWrapper()),this.updateContainerHeight(),window.addEventListener("resize",this.onViewportResize),window.visualViewport?.addEventListener("resize",this.onViewportResize)}disconnectedCallback(){const e=this.getWrapper();e&&this.resizeObserver&&this.resizeObserver.unobserve(e),window.removeEventListener("resize",this.onViewportResize),window.visualViewport?.removeEventListener("resize",this.onViewportResize)}render(){return S`
      <div class="container" data-mobile-fullscreen="${M(this.mobileFullScreen)}">
        <div
          class="page"
          data-mobile-fullscreen="${M(this.mobileFullScreen)}"
          view-direction="${this.viewDirection}"
        >
          <div class="page-content">
            <slot></slot>
          </div>
        </div>
      </div>
    `}onViewChange(e){const t=e.split(",").filter(Boolean),i=this.historyState.split(",").filter(Boolean),o=i.length,a=t.length,n=t[t.length-1]||"",r=K.cssDurationToNumber(this.transitionDuration);let s="";a>o?s="next":a<o?s="prev":a===o&&t[a-1]!==i[o-1]&&(s="next"),this.viewDirection=`${s}-${n}`,setTimeout(()=>{this.historyState=e,this.setView?.(n)},r),setTimeout(()=>{this.viewDirection=""},2*r)}getWrapper(){return this.shadowRoot?.querySelector("div.page")}updateContainerHeight(){const e=this.getWrapper();if(!e)return;const t=parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--apkt-footer-height")||"0");let i=0;if(this.mobileFullScreen){i=(window.visualViewport?.height||window.innerHeight)-this.getHeaderHeight()-t,this.style.setProperty("--local-border-bottom-radius","0px")}else i=e.getBoundingClientRect().height+t,this.style.setProperty("--local-border-bottom-radius",t?"var(--apkt-borderRadius-5)":"0px");this.style.setProperty("--local-container-height",`${i}px`),"0px"!==this.previousHeight&&this.style.setProperty("--local-duration-height",this.transitionDuration),this.previousHeight=`${i}px`}getHeaderHeight(){return 60}};Zi.styles=[Yi],Xi([_({type:String})],Zi.prototype,"transitionDuration",void 0),Xi([_({type:String})],Zi.prototype,"transitionFunction",void 0),Xi([_({type:String})],Zi.prototype,"history",void 0),Xi([_({type:String})],Zi.prototype,"view",void 0),Xi([_({attribute:!1})],Zi.prototype,"setView",void 0),Xi([H()],Zi.prototype,"viewDirection",void 0),Xi([H()],Zi.prototype,"historyState",void 0),Xi([H()],Zi.prototype,"previousHeight",void 0),Xi([H()],Zi.prototype,"mobileFullScreen",void 0),Zi=Xi([q("w3m-router-container")],Zi);export{_i as AppKitModal,Gi as W3mListWallet,qi as W3mModal,Li as W3mModalBase,Zi as W3mRouterContainer,Vi as W3mUsageExceededView};
