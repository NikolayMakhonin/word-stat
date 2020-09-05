!function(){"use strict"
;var commonjsGlobal="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{}
;function createCommonjsModule(fn,module){
return fn(module={exports:{}
},module.exports),module.exports}
var check=function(it){
return it&&it.Math==Math&&it
},global_1=check("object"==typeof globalThis&&globalThis)||check("object"==typeof window&&window)||check("object"==typeof self&&self)||check("object"==typeof commonjsGlobal&&commonjsGlobal)||Function("return this")(),fails=function(exec){
try{return!!exec()}catch(error){return!0}
},descriptors=!fails((function(){
return 7!=Object.defineProperty({},1,{
get:function(){return 7}})[1]
})),nativePropertyIsEnumerable={}.propertyIsEnumerable,getOwnPropertyDescriptor=Object.getOwnPropertyDescriptor,objectPropertyIsEnumerable={
f:getOwnPropertyDescriptor&&!nativePropertyIsEnumerable.call({
1:2},1)?function(V){
var descriptor=getOwnPropertyDescriptor(this,V)
;return!!descriptor&&descriptor.enumerable
}:nativePropertyIsEnumerable
},createPropertyDescriptor=function(bitmap,value){
return{enumerable:!(1&bitmap),
configurable:!(2&bitmap),writable:!(4&bitmap),
value:value}
},toString={}.toString,classofRaw=function(it){
return toString.call(it).slice(8,-1)
},split="".split,indexedObject=fails((function(){
return!Object("z").propertyIsEnumerable(0)
}))?function(it){
return"String"==classofRaw(it)?split.call(it,""):Object(it)
}:Object,requireObjectCoercible=function(it){
if(null==it)throw TypeError("Can't call method on "+it)
;return it},toIndexedObject=function(it){
return indexedObject(requireObjectCoercible(it))
},isObject=function(it){
return"object"==typeof it?null!==it:"function"==typeof it
},toPrimitive=function(input,PREFERRED_STRING){
if(!isObject(input))return input;var fn,val
;if(PREFERRED_STRING&&"function"==typeof(fn=input.toString)&&!isObject(val=fn.call(input)))return val
;if("function"==typeof(fn=input.valueOf)&&!isObject(val=fn.call(input)))return val
;if(!PREFERRED_STRING&&"function"==typeof(fn=input.toString)&&!isObject(val=fn.call(input)))return val
;throw TypeError("Can't convert object to primitive value")
},hasOwnProperty={}.hasOwnProperty,has=function(it,key){
return hasOwnProperty.call(it,key)
},document$1=global_1.document,EXISTS=isObject(document$1)&&isObject(document$1.createElement),documentCreateElement=function(it){
return EXISTS?document$1.createElement(it):{}
},ie8DomDefine=!descriptors&&!fails((function(){
return 7!=Object.defineProperty(documentCreateElement("div"),"a",{
get:function(){return 7}}).a
})),nativeGetOwnPropertyDescriptor=Object.getOwnPropertyDescriptor,objectGetOwnPropertyDescriptor={
f:descriptors?nativeGetOwnPropertyDescriptor:function(O,P){
if(O=toIndexedObject(O),
P=toPrimitive(P,!0),ie8DomDefine)try{
return nativeGetOwnPropertyDescriptor(O,P)
}catch(error){}
if(has(O,P))return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O,P),O[P])
}},anObject=function(it){
if(!isObject(it))throw TypeError(String(it)+" is not an object")
;return it
},nativeDefineProperty=Object.defineProperty,objectDefineProperty={
f:descriptors?nativeDefineProperty:function(O,P,Attributes){
if(anObject(O),P=toPrimitive(P,!0),
anObject(Attributes),ie8DomDefine)try{
return nativeDefineProperty(O,P,Attributes)
}catch(error){}
if("get"in Attributes||"set"in Attributes)throw TypeError("Accessors not supported")
;return"value"in Attributes&&(O[P]=Attributes.value),
O}
},createNonEnumerableProperty=descriptors?function(object,key,value){
return objectDefineProperty.f(object,key,createPropertyDescriptor(1,value))
}:function(object,key,value){
return object[key]=value,object
},setGlobal=function(key,value){try{
createNonEnumerableProperty(global_1,key,value)
}catch(error){global_1[key]=value}return value
},sharedStore=global_1["__core-js_shared__"]||setGlobal("__core-js_shared__",{}),functionToString=Function.toString
;"function"!=typeof sharedStore.inspectSource&&(sharedStore.inspectSource=function(it){
return functionToString.call(it)})
;var set,get,has$1,inspectSource=sharedStore.inspectSource,WeakMap=global_1.WeakMap,nativeWeakMap="function"==typeof WeakMap&&/native code/.test(inspectSource(WeakMap)),shared=createCommonjsModule((function(module){
(module.exports=function(key,value){
return sharedStore[key]||(sharedStore[key]=void 0!==value?value:{})
})("versions",[]).push({version:"3.6.5",
mode:"global",
copyright:"© 2020 Denis Pushkarev (zloirock.ru)"})
})),id=0,postfix=Math.random(),uid=function(key){
return"Symbol("+String(void 0===key?"":key)+")_"+(++id+postfix).toString(36)
},keys=shared("keys"),sharedKey=function(key){
return keys[key]||(keys[key]=uid(key))
},hiddenKeys={},WeakMap$1=global_1.WeakMap
;if(nativeWeakMap){
var store$1=new WeakMap$1,wmget=store$1.get,wmhas=store$1.has,wmset=store$1.set
;set=function(it,metadata){
return wmset.call(store$1,it,metadata),metadata
},get=function(it){
return wmget.call(store$1,it)||{}
},has$1=function(it){return wmhas.call(store$1,it)
}}else{var STATE=sharedKey("state")
;hiddenKeys[STATE]=!0,set=function(it,metadata){
return createNonEnumerableProperty(it,STATE,metadata),
metadata},get=function(it){
return has(it,STATE)?it[STATE]:{}
},has$1=function(it){return has(it,STATE)}}
var activeXDocument,internalState={set:set,
get:get,has:has$1,enforce:function(it){
return has$1(it)?get(it):set(it,{})},
getterFor:function(TYPE){return function(it){
var state
;if(!isObject(it)||(state=get(it)).type!==TYPE)throw TypeError("Incompatible receiver, "+TYPE+" required")
;return state}}
},redefine=createCommonjsModule((function(module){
var getInternalState=internalState.get,enforceInternalState=internalState.enforce,TEMPLATE=String(String).split("String")
;(module.exports=function(O,key,value,options){
var unsafe=!!options&&!!options.unsafe,simple=!!options&&!!options.enumerable,noTargetGet=!!options&&!!options.noTargetGet
;"function"==typeof value&&("string"!=typeof key||has(value,"name")||createNonEnumerableProperty(value,"name",key),
enforceInternalState(value).source=TEMPLATE.join("string"==typeof key?key:"")),
O!==global_1?(unsafe?!noTargetGet&&O[key]&&(simple=!0):delete O[key],
simple?O[key]=value:createNonEnumerableProperty(O,key,value)):simple?O[key]=value:setGlobal(key,value)
})(Function.prototype,"toString",(function(){
return"function"==typeof this&&getInternalState(this).source||inspectSource(this)
}))})),path=global_1,aFunction=function(variable){
return"function"==typeof variable?variable:void 0
},getBuiltIn=function(namespace,method){
return arguments.length<2?aFunction(path[namespace])||aFunction(global_1[namespace]):path[namespace]&&path[namespace][method]||global_1[namespace]&&global_1[namespace][method]
},ceil=Math.ceil,floor=Math.floor,toInteger=function(argument){
return isNaN(argument=+argument)?0:(argument>0?floor:ceil)(argument)
},min=Math.min,toLength=function(argument){
return argument>0?min(toInteger(argument),9007199254740991):0
},max=Math.max,min$1=Math.min,toAbsoluteIndex=function(index,length){
var integer=toInteger(index)
;return integer<0?max(integer+length,0):min$1(integer,length)
},createMethod=function(IS_INCLUDES){
return function($this,el,fromIndex){
var value,O=toIndexedObject($this),length=toLength(O.length),index=toAbsoluteIndex(fromIndex,length)
;if(IS_INCLUDES&&el!=el){
for(;length>index;)if((value=O[index++])!=value)return!0
}else for(;length>index;index++)if((IS_INCLUDES||index in O)&&O[index]===el)return IS_INCLUDES||index||0
;return!IS_INCLUDES&&-1}},arrayIncludes={
includes:createMethod(!0),indexOf:createMethod(!1)
},indexOf=arrayIncludes.indexOf,objectKeysInternal=function(object,names){
var key,O=toIndexedObject(object),i=0,result=[]
;for(key in O)!has(hiddenKeys,key)&&has(O,key)&&result.push(key)
;for(;names.length>i;)has(O,key=names[i++])&&(~indexOf(result,key)||result.push(key))
;return result
},enumBugKeys=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"],hiddenKeys$1=enumBugKeys.concat("length","prototype"),objectGetOwnPropertyNames={
f:Object.getOwnPropertyNames||function(O){
return objectKeysInternal(O,hiddenKeys$1)}
},objectGetOwnPropertySymbols={
f:Object.getOwnPropertySymbols
},ownKeys=getBuiltIn("Reflect","ownKeys")||function(it){
var keys=objectGetOwnPropertyNames.f(anObject(it)),getOwnPropertySymbols=objectGetOwnPropertySymbols.f
;return getOwnPropertySymbols?keys.concat(getOwnPropertySymbols(it)):keys
},copyConstructorProperties=function(target,source){
for(var keys=ownKeys(source),defineProperty=objectDefineProperty.f,getOwnPropertyDescriptor=objectGetOwnPropertyDescriptor.f,i=0;i<keys.length;i++){
var key=keys[i]
;has(target,key)||defineProperty(target,key,getOwnPropertyDescriptor(source,key))
}
},replacement=/#|\.prototype\./,isForced=function(feature,detection){
var value=data[normalize(feature)]
;return value==POLYFILL||value!=NATIVE&&("function"==typeof detection?fails(detection):!!detection)
},normalize=isForced.normalize=function(string){
return String(string).replace(replacement,".").toLowerCase()
},data=isForced.data={},NATIVE=isForced.NATIVE="N",POLYFILL=isForced.POLYFILL="P",isForced_1=isForced,getOwnPropertyDescriptor$1=objectGetOwnPropertyDescriptor.f,_export=function(options,source){
var target,key,targetProperty,sourceProperty,descriptor,TARGET=options.target,GLOBAL=options.global,STATIC=options.stat
;if(target=GLOBAL?global_1:STATIC?global_1[TARGET]||setGlobal(TARGET,{}):(global_1[TARGET]||{}).prototype)for(key in source){
if(sourceProperty=source[key],
targetProperty=options.noTargetGet?(descriptor=getOwnPropertyDescriptor$1(target,key))&&descriptor.value:target[key],
!isForced_1(GLOBAL?key:TARGET+(STATIC?".":"#")+key,options.forced)&&void 0!==targetProperty){
if(typeof sourceProperty==typeof targetProperty)continue
;copyConstructorProperties(sourceProperty,targetProperty)
}
(options.sham||targetProperty&&targetProperty.sham)&&createNonEnumerableProperty(sourceProperty,"sham",!0),
redefine(target,key,sourceProperty,options)}
},nativeSymbol=!!Object.getOwnPropertySymbols&&!fails((function(){
return!String(Symbol())
})),useSymbolAsUid=nativeSymbol&&!Symbol.sham&&"symbol"==typeof Symbol.iterator,isArray=Array.isArray||function(arg){
return"Array"==classofRaw(arg)
},toObject=function(argument){
return Object(requireObjectCoercible(argument))
},objectKeys=Object.keys||function(O){
return objectKeysInternal(O,enumBugKeys)
},objectDefineProperties=descriptors?Object.defineProperties:function(O,Properties){
anObject(O)
;for(var key,keys=objectKeys(Properties),length=keys.length,index=0;length>index;)objectDefineProperty.f(O,key=keys[index++],Properties[key])
;return O
},html=getBuiltIn("document","documentElement"),IE_PROTO=sharedKey("IE_PROTO"),EmptyConstructor=function(){},scriptTag=function(content){
return"<script>"+content+"<\/script>"
},NullProtoObject=function(){try{
activeXDocument=document.domain&&new ActiveXObject("htmlfile")
}catch(error){}var iframeDocument,iframe
;NullProtoObject=activeXDocument?function(activeXDocument){
activeXDocument.write(scriptTag("")),
activeXDocument.close()
;var temp=activeXDocument.parentWindow.Object
;return activeXDocument=null,temp
}(activeXDocument):((iframe=documentCreateElement("iframe")).style.display="none",
html.appendChild(iframe),
iframe.src=String("javascript:"),(iframeDocument=iframe.contentWindow.document).open(),
iframeDocument.write(scriptTag("document.F=Object")),
iframeDocument.close(),iframeDocument.F)
;for(var length=enumBugKeys.length;length--;)delete NullProtoObject.prototype[enumBugKeys[length]]
;return NullProtoObject()};hiddenKeys[IE_PROTO]=!0
;var objectCreate=Object.create||function(O,Properties){
var result
;return null!==O?(EmptyConstructor.prototype=anObject(O),result=new EmptyConstructor,
EmptyConstructor.prototype=null,
result[IE_PROTO]=O):result=NullProtoObject(),void 0===Properties?result:objectDefineProperties(result,Properties)
},nativeGetOwnPropertyNames=objectGetOwnPropertyNames.f,toString$1={}.toString,windowNames="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],objectGetOwnPropertyNamesExternal={
f:function(it){
return windowNames&&"[object Window]"==toString$1.call(it)?function(it){
try{return nativeGetOwnPropertyNames(it)
}catch(error){return windowNames.slice()}
}(it):nativeGetOwnPropertyNames(toIndexedObject(it))
}
},WellKnownSymbolsStore=shared("wks"),Symbol$1=global_1.Symbol,createWellKnownSymbol=useSymbolAsUid?Symbol$1:Symbol$1&&Symbol$1.withoutSetter||uid,wellKnownSymbol=function(name){
return has(WellKnownSymbolsStore,name)||(nativeSymbol&&has(Symbol$1,name)?WellKnownSymbolsStore[name]=Symbol$1[name]:WellKnownSymbolsStore[name]=createWellKnownSymbol("Symbol."+name)),
WellKnownSymbolsStore[name]
},wellKnownSymbolWrapped={f:wellKnownSymbol
},defineProperty=objectDefineProperty.f,defineWellKnownSymbol=function(NAME){
var Symbol=path.Symbol||(path.Symbol={})
;has(Symbol,NAME)||defineProperty(Symbol,NAME,{
value:wellKnownSymbolWrapped.f(NAME)})
},defineProperty$1=objectDefineProperty.f,TO_STRING_TAG=wellKnownSymbol("toStringTag"),setToStringTag=function(it,TAG,STATIC){
it&&!has(it=STATIC?it:it.prototype,TO_STRING_TAG)&&defineProperty$1(it,TO_STRING_TAG,{
configurable:!0,value:TAG})
},aFunction$1=function(it){
if("function"!=typeof it)throw TypeError(String(it)+" is not a function")
;return it
},functionBindContext=function(fn,that,length){
if(aFunction$1(fn),void 0===that)return fn
;switch(length){case 0:return function(){
return fn.call(that)};case 1:return function(a){
return fn.call(that,a)};case 2:
return function(a,b){return fn.call(that,a,b)}
;case 3:return function(a,b,c){
return fn.call(that,a,b,c)}}return function(){
return fn.apply(that,arguments)}
},SPECIES=wellKnownSymbol("species"),arraySpeciesCreate=function(originalArray,length){
var C
;return isArray(originalArray)&&("function"!=typeof(C=originalArray.constructor)||C!==Array&&!isArray(C.prototype)?isObject(C)&&null===(C=C[SPECIES])&&(C=void 0):C=void 0),
new(void 0===C?Array:C)(0===length?0:length)
},push=[].push,createMethod$1=function(TYPE){
var IS_MAP=1==TYPE,IS_FILTER=2==TYPE,IS_SOME=3==TYPE,IS_EVERY=4==TYPE,IS_FIND_INDEX=6==TYPE,NO_HOLES=5==TYPE||IS_FIND_INDEX
;return function($this,callbackfn,that,specificCreate){
for(var value,result,O=toObject($this),self=indexedObject(O),boundFunction=functionBindContext(callbackfn,that,3),length=toLength(self.length),index=0,create=specificCreate||arraySpeciesCreate,target=IS_MAP?create($this,length):IS_FILTER?create($this,0):void 0;length>index;index++)if((NO_HOLES||index in self)&&(result=boundFunction(value=self[index],index,O),
TYPE))if(IS_MAP)target[index]=result;else if(result)switch(TYPE){
case 3:return!0;case 5:return value;case 6:
return index;case 2:push.call(target,value)
}else if(IS_EVERY)return!1
;return IS_FIND_INDEX?-1:IS_SOME||IS_EVERY?IS_EVERY:target
}},arrayIteration={forEach:createMethod$1(0),
map:createMethod$1(1),filter:createMethod$1(2),
some:createMethod$1(3),every:createMethod$1(4),
find:createMethod$1(5),findIndex:createMethod$1(6)
},$forEach=arrayIteration.forEach,HIDDEN=sharedKey("hidden"),TO_PRIMITIVE=wellKnownSymbol("toPrimitive"),setInternalState=internalState.set,getInternalState=internalState.getterFor("Symbol"),ObjectPrototype=Object.prototype,$Symbol=global_1.Symbol,$stringify=getBuiltIn("JSON","stringify"),nativeGetOwnPropertyDescriptor$1=objectGetOwnPropertyDescriptor.f,nativeDefineProperty$1=objectDefineProperty.f,nativeGetOwnPropertyNames$1=objectGetOwnPropertyNamesExternal.f,nativePropertyIsEnumerable$1=objectPropertyIsEnumerable.f,AllSymbols=shared("symbols"),ObjectPrototypeSymbols=shared("op-symbols"),StringToSymbolRegistry=shared("string-to-symbol-registry"),SymbolToStringRegistry=shared("symbol-to-string-registry"),WellKnownSymbolsStore$1=shared("wks"),QObject=global_1.QObject,USE_SETTER=!QObject||!QObject.prototype||!QObject.prototype.findChild,setSymbolDescriptor=descriptors&&fails((function(){
return 7!=objectCreate(nativeDefineProperty$1({},"a",{
get:function(){
return nativeDefineProperty$1(this,"a",{value:7
}).a}})).a}))?function(O,P,Attributes){
var ObjectPrototypeDescriptor=nativeGetOwnPropertyDescriptor$1(ObjectPrototype,P)
;ObjectPrototypeDescriptor&&delete ObjectPrototype[P],
nativeDefineProperty$1(O,P,Attributes),
ObjectPrototypeDescriptor&&O!==ObjectPrototype&&nativeDefineProperty$1(ObjectPrototype,P,ObjectPrototypeDescriptor)
}:nativeDefineProperty$1,wrap=function(tag,description){
var symbol=AllSymbols[tag]=objectCreate($Symbol.prototype)
;return setInternalState(symbol,{type:"Symbol",
tag:tag,description:description
}),descriptors||(symbol.description=description),
symbol},isSymbol=useSymbolAsUid?function(it){
return"symbol"==typeof it}:function(it){
return Object(it)instanceof $Symbol
},$defineProperty=function(O,P,Attributes){
O===ObjectPrototype&&$defineProperty(ObjectPrototypeSymbols,P,Attributes),
anObject(O);var key=toPrimitive(P,!0)
;return anObject(Attributes),has(AllSymbols,key)?(Attributes.enumerable?(has(O,HIDDEN)&&O[HIDDEN][key]&&(O[HIDDEN][key]=!1),
Attributes=objectCreate(Attributes,{
enumerable:createPropertyDescriptor(0,!1)
})):(has(O,HIDDEN)||nativeDefineProperty$1(O,HIDDEN,createPropertyDescriptor(1,{})),
O[HIDDEN][key]=!0),
setSymbolDescriptor(O,key,Attributes)):nativeDefineProperty$1(O,key,Attributes)
},$defineProperties=function(O,Properties){
anObject(O)
;var properties=toIndexedObject(Properties),keys=objectKeys(properties).concat($getOwnPropertySymbols(properties))
;return $forEach(keys,(function(key){
descriptors&&!$propertyIsEnumerable.call(properties,key)||$defineProperty(O,key,properties[key])
})),O},$propertyIsEnumerable=function(V){
var P=toPrimitive(V,!0),enumerable=nativePropertyIsEnumerable$1.call(this,P)
;return!(this===ObjectPrototype&&has(AllSymbols,P)&&!has(ObjectPrototypeSymbols,P))&&(!(enumerable||!has(this,P)||!has(AllSymbols,P)||has(this,HIDDEN)&&this[HIDDEN][P])||enumerable)
},$getOwnPropertyDescriptor=function(O,P){
var it=toIndexedObject(O),key=toPrimitive(P,!0)
;if(it!==ObjectPrototype||!has(AllSymbols,key)||has(ObjectPrototypeSymbols,key)){
var descriptor=nativeGetOwnPropertyDescriptor$1(it,key)
;return!descriptor||!has(AllSymbols,key)||has(it,HIDDEN)&&it[HIDDEN][key]||(descriptor.enumerable=!0),
descriptor}},$getOwnPropertyNames=function(O){
var names=nativeGetOwnPropertyNames$1(toIndexedObject(O)),result=[]
;return $forEach(names,(function(key){
has(AllSymbols,key)||has(hiddenKeys,key)||result.push(key)
})),result},$getOwnPropertySymbols=function(O){
var IS_OBJECT_PROTOTYPE=O===ObjectPrototype,names=nativeGetOwnPropertyNames$1(IS_OBJECT_PROTOTYPE?ObjectPrototypeSymbols:toIndexedObject(O)),result=[]
;return $forEach(names,(function(key){
!has(AllSymbols,key)||IS_OBJECT_PROTOTYPE&&!has(ObjectPrototype,key)||result.push(AllSymbols[key])
})),result}
;if(nativeSymbol||(redefine(($Symbol=function(){
if(this instanceof $Symbol)throw TypeError("Symbol is not a constructor")
;var description=arguments.length&&void 0!==arguments[0]?String(arguments[0]):void 0,tag=uid(description),setter=function(value){
this===ObjectPrototype&&setter.call(ObjectPrototypeSymbols,value),
has(this,HIDDEN)&&has(this[HIDDEN],tag)&&(this[HIDDEN][tag]=!1),
setSymbolDescriptor(this,tag,createPropertyDescriptor(1,value))
}
;return descriptors&&USE_SETTER&&setSymbolDescriptor(ObjectPrototype,tag,{
configurable:!0,set:setter}),wrap(tag,description)
}).prototype,"toString",(function(){
return getInternalState(this).tag
})),redefine($Symbol,"withoutSetter",(function(description){
return wrap(uid(description),description)
})),objectPropertyIsEnumerable.f=$propertyIsEnumerable,
objectDefineProperty.f=$defineProperty,
objectGetOwnPropertyDescriptor.f=$getOwnPropertyDescriptor,
objectGetOwnPropertyNames.f=objectGetOwnPropertyNamesExternal.f=$getOwnPropertyNames,
objectGetOwnPropertySymbols.f=$getOwnPropertySymbols,
wellKnownSymbolWrapped.f=function(name){
return wrap(wellKnownSymbol(name),name)
},descriptors&&(nativeDefineProperty$1($Symbol.prototype,"description",{
configurable:!0,get:function(){
return getInternalState(this).description}
}),redefine(ObjectPrototype,"propertyIsEnumerable",$propertyIsEnumerable,{
unsafe:!0}))),_export({global:!0,wrap:!0,
forced:!nativeSymbol,sham:!nativeSymbol},{
Symbol:$Symbol
}),$forEach(objectKeys(WellKnownSymbolsStore$1),(function(name){
defineWellKnownSymbol(name)})),_export({
target:"Symbol",stat:!0,forced:!nativeSymbol},{
for:function(key){var string=String(key)
;if(has(StringToSymbolRegistry,string))return StringToSymbolRegistry[string]
;var symbol=$Symbol(string)
;return StringToSymbolRegistry[string]=symbol,SymbolToStringRegistry[symbol]=string,
symbol},keyFor:function(sym){
if(!isSymbol(sym))throw TypeError(sym+" is not a symbol")
;if(has(SymbolToStringRegistry,sym))return SymbolToStringRegistry[sym]
},useSetter:function(){USE_SETTER=!0},
useSimple:function(){USE_SETTER=!1}}),_export({
target:"Object",stat:!0,forced:!nativeSymbol,
sham:!descriptors},{create:function(O,Properties){
return void 0===Properties?objectCreate(O):$defineProperties(objectCreate(O),Properties)
},defineProperty:$defineProperty,
defineProperties:$defineProperties,
getOwnPropertyDescriptor:$getOwnPropertyDescriptor
}),_export({target:"Object",stat:!0,
forced:!nativeSymbol},{
getOwnPropertyNames:$getOwnPropertyNames,
getOwnPropertySymbols:$getOwnPropertySymbols
}),_export({target:"Object",stat:!0,
forced:fails((function(){
objectGetOwnPropertySymbols.f(1)}))},{
getOwnPropertySymbols:function(it){
return objectGetOwnPropertySymbols.f(toObject(it))
}}),$stringify){
var FORCED_JSON_STRINGIFY=!nativeSymbol||fails((function(){
var symbol=$Symbol()
;return"[null]"!=$stringify([symbol])||"{}"!=$stringify({
a:symbol})||"{}"!=$stringify(Object(symbol))}))
;_export({target:"JSON",stat:!0,
forced:FORCED_JSON_STRINGIFY},{
stringify:function(it,replacer,space){
for(var $replacer,args=[it],index=1;arguments.length>index;)args.push(arguments[index++])
;if($replacer=replacer,
(isObject(replacer)||void 0!==it)&&!isSymbol(it))return isArray(replacer)||(replacer=function(key,value){
if("function"==typeof $replacer&&(value=$replacer.call(this,key,value)),
!isSymbol(value))return value
}),args[1]=replacer,$stringify.apply(null,args)}})
}
$Symbol.prototype[TO_PRIMITIVE]||createNonEnumerableProperty($Symbol.prototype,TO_PRIMITIVE,$Symbol.prototype.valueOf),
setToStringTag($Symbol,"Symbol"),
hiddenKeys[HIDDEN]=!0,defineWellKnownSymbol("asyncIterator")
;var defineProperty$2=objectDefineProperty.f,NativeSymbol=global_1.Symbol
;if(descriptors&&"function"==typeof NativeSymbol&&(!("description"in NativeSymbol.prototype)||void 0!==NativeSymbol().description)){
var EmptyStringDescriptionStore={},SymbolWrapper=function(){
var description=arguments.length<1||void 0===arguments[0]?void 0:String(arguments[0]),result=this instanceof SymbolWrapper?new NativeSymbol(description):void 0===description?NativeSymbol():NativeSymbol(description)
;return""===description&&(EmptyStringDescriptionStore[result]=!0),
result}
;copyConstructorProperties(SymbolWrapper,NativeSymbol)
;var symbolPrototype=SymbolWrapper.prototype=NativeSymbol.prototype
;symbolPrototype.constructor=SymbolWrapper
;var symbolToString=symbolPrototype.toString,native="Symbol(test)"==String(NativeSymbol("test")),regexp=/^Symbol\((.*)\)[^)]+$/
;defineProperty$2(symbolPrototype,"description",{
configurable:!0,get:function(){
var symbol=isObject(this)?this.valueOf():this,string=symbolToString.call(symbol)
;if(has(EmptyStringDescriptionStore,symbol))return""
;var desc=native?string.slice(7,-1):string.replace(regexp,"$1")
;return""===desc?void 0:desc}}),_export({
global:!0,forced:!0},{Symbol:SymbolWrapper})}
defineWellKnownSymbol("hasInstance"),
defineWellKnownSymbol("isConcatSpreadable"),
defineWellKnownSymbol("iterator"),defineWellKnownSymbol("match"),
defineWellKnownSymbol("matchAll"),
defineWellKnownSymbol("replace"),defineWellKnownSymbol("search"),
defineWellKnownSymbol("species"),
defineWellKnownSymbol("split"),defineWellKnownSymbol("toPrimitive"),
defineWellKnownSymbol("toStringTag"),
defineWellKnownSymbol("unscopables")
;var nativeAssign=Object.assign,defineProperty$3=Object.defineProperty,objectAssign=!nativeAssign||fails((function(){
if(descriptors&&1!==nativeAssign({b:1
},nativeAssign(defineProperty$3({},"a",{
enumerable:!0,get:function(){
defineProperty$3(this,"b",{value:3,enumerable:!1})
}}),{b:2})).b)return!0
;var A={},B={},symbol=Symbol()
;return A[symbol]=7,"abcdefghijklmnopqrst".split("").forEach((function(chr){
B[chr]=chr
})),7!=nativeAssign({},A)[symbol]||"abcdefghijklmnopqrst"!=objectKeys(nativeAssign({},B)).join("")
}))?function(target,source){
for(var T=toObject(target),argumentsLength=arguments.length,index=1,getOwnPropertySymbols=objectGetOwnPropertySymbols.f,propertyIsEnumerable=objectPropertyIsEnumerable.f;argumentsLength>index;)for(var key,S=indexedObject(arguments[index++]),keys=getOwnPropertySymbols?objectKeys(S).concat(getOwnPropertySymbols(S)):objectKeys(S),length=keys.length,j=0;length>j;)key=keys[j++],
descriptors&&!propertyIsEnumerable.call(S,key)||(T[key]=S[key])
;return T}:nativeAssign;_export({target:"Object",
stat:!0,forced:Object.assign!==objectAssign},{
assign:objectAssign}),_export({target:"Object",
stat:!0,sham:!descriptors},{create:objectCreate
}),_export({target:"Object",stat:!0,
forced:!descriptors,sham:!descriptors},{
defineProperty:objectDefineProperty.f}),_export({
target:"Object",stat:!0,forced:!descriptors,
sham:!descriptors},{
defineProperties:objectDefineProperties})
;var propertyIsEnumerable=objectPropertyIsEnumerable.f,createMethod$2=function(TO_ENTRIES){
return function(it){
for(var key,O=toIndexedObject(it),keys=objectKeys(O),length=keys.length,i=0,result=[];length>i;)key=keys[i++],
descriptors&&!propertyIsEnumerable.call(O,key)||result.push(TO_ENTRIES?[key,O[key]]:O[key])
;return result}},objectToArray={
entries:createMethod$2(!0),
values:createMethod$2(!1)
},$entries=objectToArray.entries;_export({
target:"Object",stat:!0},{entries:function(O){
return $entries(O)}})
;var freezing=!fails((function(){
return Object.isExtensible(Object.preventExtensions({}))
})),internalMetadata=createCommonjsModule((function(module){
var defineProperty=objectDefineProperty.f,METADATA=uid("meta"),id=0,isExtensible=Object.isExtensible||function(){
return!0},setMetadata=function(it){
defineProperty(it,METADATA,{value:{
objectID:"O"+ ++id,weakData:{}}})
},meta=module.exports={REQUIRED:!1,
fastKey:function(it,create){
if(!isObject(it))return"symbol"==typeof it?it:("string"==typeof it?"S":"P")+it
;if(!has(it,METADATA)){
if(!isExtensible(it))return"F"
;if(!create)return"E";setMetadata(it)}
return it[METADATA].objectID},
getWeakData:function(it,create){
if(!has(it,METADATA)){
if(!isExtensible(it))return!0;if(!create)return!1
;setMetadata(it)}return it[METADATA].weakData},
onFreeze:function(it){
return freezing&&meta.REQUIRED&&isExtensible(it)&&!has(it,METADATA)&&setMetadata(it),
it}};hiddenKeys[METADATA]=!0
})),onFreeze=(internalMetadata.REQUIRED,internalMetadata.fastKey,
internalMetadata.getWeakData,
internalMetadata.onFreeze,internalMetadata.onFreeze),nativeFreeze=Object.freeze,FAILS_ON_PRIMITIVES=fails((function(){
nativeFreeze(1)}));_export({target:"Object",
stat:!0,forced:FAILS_ON_PRIMITIVES,sham:!freezing
},{freeze:function(it){
return nativeFreeze&&isObject(it)?nativeFreeze(onFreeze(it)):it
}})
;var iterators={},ITERATOR=wellKnownSymbol("iterator"),ArrayPrototype=Array.prototype,isArrayIteratorMethod=function(it){
return void 0!==it&&(iterators.Array===it||ArrayPrototype[ITERATOR]===it)
},test={};test[wellKnownSymbol("toStringTag")]="z"
;var toStringTagSupport="[object z]"===String(test),TO_STRING_TAG$2=wellKnownSymbol("toStringTag"),CORRECT_ARGUMENTS="Arguments"==classofRaw(function(){
return arguments
}()),classof=toStringTagSupport?classofRaw:function(it){
var O,tag,result
;return void 0===it?"Undefined":null===it?"Null":"string"==typeof(tag=function(it,key){
try{return it[key]}catch(error){}
}(O=Object(it),TO_STRING_TAG$2))?tag:CORRECT_ARGUMENTS?classofRaw(O):"Object"==(result=classofRaw(O))&&"function"==typeof O.callee?"Arguments":result
},ITERATOR$1=wellKnownSymbol("iterator"),getIteratorMethod=function(it){
if(null!=it)return it[ITERATOR$1]||it["@@iterator"]||iterators[classof(it)]
},callWithSafeIterationClosing=function(iterator,fn,value,ENTRIES){
try{
return ENTRIES?fn(anObject(value)[0],value[1]):fn(value)
}catch(error){var returnMethod=iterator.return
;throw void 0!==returnMethod&&anObject(returnMethod.call(iterator)),
error}
},iterate_1=createCommonjsModule((function(module){
var Result=function(stopped,result){
this.stopped=stopped,this.result=result}
;(module.exports=function(iterable,fn,that,AS_ENTRIES,IS_ITERATOR){
var iterator,iterFn,index,length,result,next,step,boundFunction=functionBindContext(fn,that,AS_ENTRIES?2:1)
;if(IS_ITERATOR)iterator=iterable;else{
if("function"!=typeof(iterFn=getIteratorMethod(iterable)))throw TypeError("Target is not iterable")
;if(isArrayIteratorMethod(iterFn)){
for(index=0,length=toLength(iterable.length);length>index;index++)if((result=AS_ENTRIES?boundFunction(anObject(step=iterable[index])[0],step[1]):boundFunction(iterable[index]))&&result instanceof Result)return result
;return new Result(!1)}
iterator=iterFn.call(iterable)}
for(next=iterator.next;!(step=next.call(iterator)).done;)if("object"==typeof(result=callWithSafeIterationClosing(iterator,boundFunction,step.value,AS_ENTRIES))&&result&&result instanceof Result)return result
;return new Result(!1)}).stop=function(result){
return new Result(!0,result)}
})),createProperty=function(object,key,value){
var propertyKey=toPrimitive(key)
;propertyKey in object?objectDefineProperty.f(object,propertyKey,createPropertyDescriptor(0,value)):object[propertyKey]=value
};_export({target:"Object",stat:!0},{
fromEntries:function(iterable){var obj={}
;return iterate_1(iterable,(function(k,v){
createProperty(obj,k,v)}),void 0,!0),obj}})
;var nativeGetOwnPropertyDescriptor$2=objectGetOwnPropertyDescriptor.f,FAILS_ON_PRIMITIVES$1=fails((function(){
nativeGetOwnPropertyDescriptor$2(1)}));_export({
target:"Object",stat:!0,
forced:!descriptors||FAILS_ON_PRIMITIVES$1,
sham:!descriptors},{
getOwnPropertyDescriptor:function(it,key){
return nativeGetOwnPropertyDescriptor$2(toIndexedObject(it),key)
}}),_export({target:"Object",stat:!0,
sham:!descriptors},{
getOwnPropertyDescriptors:function(object){
for(var key,descriptor,O=toIndexedObject(object),getOwnPropertyDescriptor=objectGetOwnPropertyDescriptor.f,keys=ownKeys(O),result={},index=0;keys.length>index;)void 0!==(descriptor=getOwnPropertyDescriptor(O,key=keys[index++]))&&createProperty(result,key,descriptor)
;return result}})
;var nativeGetOwnPropertyNames$2=objectGetOwnPropertyNamesExternal.f,FAILS_ON_PRIMITIVES$2=fails((function(){
return!Object.getOwnPropertyNames(1)}));_export({
target:"Object",stat:!0,
forced:FAILS_ON_PRIMITIVES$2},{
getOwnPropertyNames:nativeGetOwnPropertyNames$2})
;var correctPrototypeGetter=!fails((function(){
function F(){}
return F.prototype.constructor=null,Object.getPrototypeOf(new F)!==F.prototype
})),IE_PROTO$1=sharedKey("IE_PROTO"),ObjectPrototype$1=Object.prototype,objectGetPrototypeOf=correctPrototypeGetter?Object.getPrototypeOf:function(O){
return O=toObject(O),
has(O,IE_PROTO$1)?O[IE_PROTO$1]:"function"==typeof O.constructor&&O instanceof O.constructor?O.constructor.prototype:O instanceof Object?ObjectPrototype$1:null
},FAILS_ON_PRIMITIVES$3=fails((function(){
objectGetPrototypeOf(1)}));_export({
target:"Object",stat:!0,
forced:FAILS_ON_PRIMITIVES$3,
sham:!correctPrototypeGetter},{
getPrototypeOf:function(it){
return objectGetPrototypeOf(toObject(it))}})
;var sameValue=Object.is||function(x,y){
return x===y?0!==x||1/x==1/y:x!=x&&y!=y};_export({
target:"Object",stat:!0},{is:sameValue})
;var nativeIsExtensible=Object.isExtensible,FAILS_ON_PRIMITIVES$4=fails((function(){
nativeIsExtensible(1)}));_export({target:"Object",
stat:!0,forced:FAILS_ON_PRIMITIVES$4},{
isExtensible:function(it){
return!!isObject(it)&&(!nativeIsExtensible||nativeIsExtensible(it))
}})
;var nativeIsFrozen=Object.isFrozen,FAILS_ON_PRIMITIVES$5=fails((function(){
nativeIsFrozen(1)}));_export({target:"Object",
stat:!0,forced:FAILS_ON_PRIMITIVES$5},{
isFrozen:function(it){
return!isObject(it)||!!nativeIsFrozen&&nativeIsFrozen(it)
}})
;var nativeIsSealed=Object.isSealed,FAILS_ON_PRIMITIVES$6=fails((function(){
nativeIsSealed(1)}));_export({target:"Object",
stat:!0,forced:FAILS_ON_PRIMITIVES$6},{
isSealed:function(it){
return!isObject(it)||!!nativeIsSealed&&nativeIsSealed(it)
}});var FAILS_ON_PRIMITIVES$7=fails((function(){
objectKeys(1)}));_export({target:"Object",stat:!0,
forced:FAILS_ON_PRIMITIVES$7},{keys:function(it){
return objectKeys(toObject(it))}})
;var onFreeze$1=internalMetadata.onFreeze,nativePreventExtensions=Object.preventExtensions,FAILS_ON_PRIMITIVES$8=fails((function(){
nativePreventExtensions(1)}));_export({
target:"Object",stat:!0,
forced:FAILS_ON_PRIMITIVES$8,sham:!freezing},{
preventExtensions:function(it){
return nativePreventExtensions&&isObject(it)?nativePreventExtensions(onFreeze$1(it)):it
}})
;var onFreeze$2=internalMetadata.onFreeze,nativeSeal=Object.seal,FAILS_ON_PRIMITIVES$9=fails((function(){
nativeSeal(1)}));_export({target:"Object",stat:!0,
forced:FAILS_ON_PRIMITIVES$9,sham:!freezing},{
seal:function(it){
return nativeSeal&&isObject(it)?nativeSeal(onFreeze$2(it)):it
}});var aPossiblePrototype=function(it){
if(!isObject(it)&&null!==it)throw TypeError("Can't set "+String(it)+" as a prototype")
;return it
},objectSetPrototypeOf=Object.setPrototypeOf||("__proto__"in{}?function(){
var setter,CORRECT_SETTER=!1,test={};try{
(setter=Object.getOwnPropertyDescriptor(Object.prototype,"__proto__").set).call(test,[]),
CORRECT_SETTER=test instanceof Array
}catch(error){}return function(O,proto){
return anObject(O),aPossiblePrototype(proto),
CORRECT_SETTER?setter.call(O,proto):O.__proto__=proto,
O}}():void 0);_export({target:"Object",stat:!0},{
setPrototypeOf:objectSetPrototypeOf})
;var $values=objectToArray.values;_export({
target:"Object",stat:!0},{values:function(O){
return $values(O)}})
;var objectToString=toStringTagSupport?{}.toString:function(){
return"[object "+classof(this)+"]"}
;toStringTagSupport||redefine(Object.prototype,"toString",objectToString,{
unsafe:!0})
;var objectPrototypeAccessorsForced=!fails((function(){
var key=Math.random()
;__defineSetter__.call(null,key,(function(){})),delete global_1[key]
}));descriptors&&_export({target:"Object",
proto:!0,forced:objectPrototypeAccessorsForced},{
__defineGetter__:function(P,getter){
objectDefineProperty.f(toObject(this),P,{
get:aFunction$1(getter),enumerable:!0,
configurable:!0})}}),descriptors&&_export({
target:"Object",proto:!0,
forced:objectPrototypeAccessorsForced},{
__defineSetter__:function(P,setter){
objectDefineProperty.f(toObject(this),P,{
set:aFunction$1(setter),enumerable:!0,
configurable:!0})}})
;var getOwnPropertyDescriptor$2=objectGetOwnPropertyDescriptor.f
;descriptors&&_export({target:"Object",proto:!0,
forced:objectPrototypeAccessorsForced},{
__lookupGetter__:function(P){
var desc,O=toObject(this),key=toPrimitive(P,!0)
;do{
if(desc=getOwnPropertyDescriptor$2(O,key))return desc.get
}while(O=objectGetPrototypeOf(O))}})
;var getOwnPropertyDescriptor$3=objectGetOwnPropertyDescriptor.f
;descriptors&&_export({target:"Object",proto:!0,
forced:objectPrototypeAccessorsForced},{
__lookupSetter__:function(P){
var desc,O=toObject(this),key=toPrimitive(P,!0)
;do{
if(desc=getOwnPropertyDescriptor$3(O,key))return desc.set
}while(O=objectGetPrototypeOf(O))}})
;var slice=[].slice,factories={},construct=function(C,argsLength,args){
if(!(argsLength in factories)){
for(var list=[],i=0;i<argsLength;i++)list[i]="a["+i+"]"
;factories[argsLength]=Function("C,a","return new C("+list.join(",")+")")
}return factories[argsLength](C,args)
},functionBind=Function.bind||function(that){
var fn=aFunction$1(this),partArgs=slice.call(arguments,1),boundFunction=function(){
var args=partArgs.concat(slice.call(arguments))
;return this instanceof boundFunction?construct(fn,args.length,args):fn.apply(that,args)
}
;return isObject(fn.prototype)&&(boundFunction.prototype=fn.prototype),boundFunction
};_export({target:"Function",proto:!0},{
bind:functionBind})
;var defineProperty$4=objectDefineProperty.f,FunctionPrototype=Function.prototype,FunctionPrototypeToString=FunctionPrototype.toString,nameRE=/^\s*function ([^ (]*)/
;descriptors&&!("name"in FunctionPrototype)&&defineProperty$4(FunctionPrototype,"name",{
configurable:!0,get:function(){try{
return FunctionPrototypeToString.call(this).match(nameRE)[1]
}catch(error){return""}}})
;var HAS_INSTANCE=wellKnownSymbol("hasInstance"),FunctionPrototype$1=Function.prototype
;HAS_INSTANCE in FunctionPrototype$1||objectDefineProperty.f(FunctionPrototype$1,HAS_INSTANCE,{
value:function(O){
if("function"!=typeof this||!isObject(O))return!1
;if(!isObject(this.prototype))return O instanceof this
;for(;O=objectGetPrototypeOf(O);)if(this.prototype===O)return!0
;return!1}}),_export({global:!0},{
globalThis:global_1})
;var arrayFrom=function(arrayLike){
var length,result,step,iterator,next,value,O=toObject(arrayLike),C="function"==typeof this?this:Array,argumentsLength=arguments.length,mapfn=argumentsLength>1?arguments[1]:void 0,mapping=void 0!==mapfn,iteratorMethod=getIteratorMethod(O),index=0
;if(mapping&&(mapfn=functionBindContext(mapfn,argumentsLength>2?arguments[2]:void 0,2)),
null==iteratorMethod||C==Array&&isArrayIteratorMethod(iteratorMethod))for(result=new C(length=toLength(O.length));length>index;index++)value=mapping?mapfn(O[index],index):O[index],
createProperty(result,index,value);else for(next=(iterator=iteratorMethod.call(O)).next,
result=new C;!(step=next.call(iterator)).done;index++)value=mapping?callWithSafeIterationClosing(iterator,mapfn,[step.value,index],!0):step.value,
createProperty(result,index,value)
;return result.length=index,result
},ITERATOR$2=wellKnownSymbol("iterator"),SAFE_CLOSING=!1
;try{var called=0,iteratorWithReturn={
next:function(){return{done:!!called++}},
return:function(){SAFE_CLOSING=!0}}
;iteratorWithReturn[ITERATOR$2]=function(){
return this
},Array.from(iteratorWithReturn,(function(){
throw 2}))}catch(error){}
var checkCorrectnessOfIteration=function(exec,SKIP_CLOSING){
if(!SKIP_CLOSING&&!SAFE_CLOSING)return!1
;var ITERATION_SUPPORT=!1;try{var object={}
;object[ITERATOR$2]=function(){return{
next:function(){return{done:ITERATION_SUPPORT=!0}}
}},exec(object)}catch(error){}
return ITERATION_SUPPORT
},INCORRECT_ITERATION=!checkCorrectnessOfIteration((function(iterable){
Array.from(iterable)}));_export({target:"Array",
stat:!0,forced:INCORRECT_ITERATION},{
from:arrayFrom}),_export({target:"Array",stat:!0
},{isArray:isArray})
;var ISNT_GENERIC=fails((function(){function F(){}
return!(Array.of.call(F)instanceof F)}));_export({
target:"Array",stat:!0,forced:ISNT_GENERIC},{
of:function(){
for(var index=0,argumentsLength=arguments.length,result=new("function"==typeof this?this:Array)(argumentsLength);argumentsLength>index;)createProperty(result,index,arguments[index++])
;return result.length=argumentsLength,result}})
;var match,version,engineUserAgent=getBuiltIn("navigator","userAgent")||"",process=global_1.process,versions=process&&process.versions,v8=versions&&versions.v8
;v8?version=(match=v8.split("."))[0]+match[1]:engineUserAgent&&(!(match=engineUserAgent.match(/Edge\/(\d+)/))||match[1]>=74)&&(match=engineUserAgent.match(/Chrome\/(\d+)/))&&(version=match[1])
;var engineV8Version=version&&+version,SPECIES$1=wellKnownSymbol("species"),arrayMethodHasSpeciesSupport=function(METHOD_NAME){
return engineV8Version>=51||!fails((function(){
var array=[]
;return(array.constructor={})[SPECIES$1]=function(){
return{foo:1}},1!==array[METHOD_NAME](Boolean).foo
}))
},IS_CONCAT_SPREADABLE=wellKnownSymbol("isConcatSpreadable"),IS_CONCAT_SPREADABLE_SUPPORT=engineV8Version>=51||!fails((function(){
var array=[]
;return array[IS_CONCAT_SPREADABLE]=!1,array.concat()[0]!==array
})),SPECIES_SUPPORT=arrayMethodHasSpeciesSupport("concat"),isConcatSpreadable=function(O){
if(!isObject(O))return!1
;var spreadable=O[IS_CONCAT_SPREADABLE]
;return void 0!==spreadable?!!spreadable:isArray(O)
};_export({target:"Array",proto:!0,
forced:!IS_CONCAT_SPREADABLE_SUPPORT||!SPECIES_SUPPORT
},{concat:function(arg){
var i,k,length,len,E,O=toObject(this),A=arraySpeciesCreate(O,0),n=0
;for(i=-1,length=arguments.length;i<length;i++)if(isConcatSpreadable(E=-1===i?O:arguments[i])){
if(n+(len=toLength(E.length))>9007199254740991)throw TypeError("Maximum allowed index exceeded")
;for(k=0;k<len;k++,
n++)k in E&&createProperty(A,n,E[k])}else{
if(n>=9007199254740991)throw TypeError("Maximum allowed index exceeded")
;createProperty(A,n++,E)}return A.length=n,A}})
;var min$2=Math.min,arrayCopyWithin=[].copyWithin||function(target,start){
var O=toObject(this),len=toLength(O.length),to=toAbsoluteIndex(target,len),from=toAbsoluteIndex(start,len),end=arguments.length>2?arguments[2]:void 0,count=min$2((void 0===end?len:toAbsoluteIndex(end,len))-from,len-to),inc=1
;for(from<to&&to<from+count&&(inc=-1,
from+=count-1,to+=count-1);count-- >0;)from in O?O[to]=O[from]:delete O[to],
to+=inc,from+=inc;return O
},UNSCOPABLES=wellKnownSymbol("unscopables"),ArrayPrototype$1=Array.prototype
;null==ArrayPrototype$1[UNSCOPABLES]&&objectDefineProperty.f(ArrayPrototype$1,UNSCOPABLES,{
configurable:!0,value:objectCreate(null)})
;var addToUnscopables=function(key){
ArrayPrototype$1[UNSCOPABLES][key]=!0};_export({
target:"Array",proto:!0},{
copyWithin:arrayCopyWithin
}),addToUnscopables("copyWithin")
;var arrayMethodIsStrict=function(METHOD_NAME,argument){
var method=[][METHOD_NAME]
;return!!method&&fails((function(){
method.call(null,argument||function(){throw 1},1)
}))
},defineProperty$5=Object.defineProperty,cache={},thrower=function(it){
throw it
},arrayMethodUsesToLength=function(METHOD_NAME,options){
if(has(cache,METHOD_NAME))return cache[METHOD_NAME]
;options||(options={})
;var method=[][METHOD_NAME],ACCESSORS=!!has(options,"ACCESSORS")&&options.ACCESSORS,argument0=has(options,0)?options[0]:thrower,argument1=has(options,1)?options[1]:void 0
;return cache[METHOD_NAME]=!!method&&!fails((function(){
if(ACCESSORS&&!descriptors)return!0;var O={
length:-1};ACCESSORS?defineProperty$5(O,1,{
enumerable:!0,get:thrower
}):O[1]=1,method.call(O,argument0,argument1)}))
},$every=arrayIteration.every,STRICT_METHOD=arrayMethodIsStrict("every"),USES_TO_LENGTH=arrayMethodUsesToLength("every")
;_export({target:"Array",proto:!0,
forced:!STRICT_METHOD||!USES_TO_LENGTH},{
every:function(callbackfn){
return $every(this,callbackfn,arguments.length>1?arguments[1]:void 0)
}});var arrayFill=function(value){
for(var O=toObject(this),length=toLength(O.length),argumentsLength=arguments.length,index=toAbsoluteIndex(argumentsLength>1?arguments[1]:void 0,length),end=argumentsLength>2?arguments[2]:void 0,endPos=void 0===end?length:toAbsoluteIndex(end,length);endPos>index;)O[index++]=value
;return O};_export({target:"Array",proto:!0},{
fill:arrayFill}),addToUnscopables("fill")
;var $filter=arrayIteration.filter,HAS_SPECIES_SUPPORT=arrayMethodHasSpeciesSupport("filter"),USES_TO_LENGTH$1=arrayMethodUsesToLength("filter")
;_export({target:"Array",proto:!0,
forced:!HAS_SPECIES_SUPPORT||!USES_TO_LENGTH$1},{
filter:function(callbackfn){
return $filter(this,callbackfn,arguments.length>1?arguments[1]:void 0)
}})
;var $find=arrayIteration.find,SKIPS_HOLES=!0,USES_TO_LENGTH$2=arrayMethodUsesToLength("find")
;"find"in[]&&Array(1).find((function(){
SKIPS_HOLES=!1})),_export({target:"Array",
proto:!0,forced:SKIPS_HOLES||!USES_TO_LENGTH$2},{
find:function(callbackfn){
return $find(this,callbackfn,arguments.length>1?arguments[1]:void 0)
}}),addToUnscopables("find")
;var $findIndex=arrayIteration.findIndex,SKIPS_HOLES$1=!0,USES_TO_LENGTH$3=arrayMethodUsesToLength("findIndex")
;"findIndex"in[]&&Array(1).findIndex((function(){
SKIPS_HOLES$1=!1})),_export({target:"Array",
proto:!0,forced:SKIPS_HOLES$1||!USES_TO_LENGTH$3
},{findIndex:function(callbackfn){
return $findIndex(this,callbackfn,arguments.length>1?arguments[1]:void 0)
}}),addToUnscopables("findIndex")
;var flattenIntoArray=function(target,original,source,sourceLen,start,depth,mapper,thisArg){
for(var element,targetIndex=start,sourceIndex=0,mapFn=!!mapper&&functionBindContext(mapper,thisArg,3);sourceIndex<sourceLen;){
if(sourceIndex in source){
if(element=mapFn?mapFn(source[sourceIndex],sourceIndex,original):source[sourceIndex],
depth>0&&isArray(element))targetIndex=flattenIntoArray(target,original,element,toLength(element.length),targetIndex,depth-1)-1;else{
if(targetIndex>=9007199254740991)throw TypeError("Exceed the acceptable array length")
;target[targetIndex]=element}targetIndex++}
sourceIndex++}return targetIndex
},flattenIntoArray_1=flattenIntoArray;_export({
target:"Array",proto:!0},{flat:function(){
var depthArg=arguments.length?arguments[0]:void 0,O=toObject(this),sourceLen=toLength(O.length),A=arraySpeciesCreate(O,0)
;return A.length=flattenIntoArray_1(A,O,O,sourceLen,0,void 0===depthArg?1:toInteger(depthArg)),
A}}),_export({target:"Array",proto:!0},{
flatMap:function(callbackfn){
var A,O=toObject(this),sourceLen=toLength(O.length)
;return aFunction$1(callbackfn),
(A=arraySpeciesCreate(O,0)).length=flattenIntoArray_1(A,O,O,sourceLen,0,1,callbackfn,arguments.length>1?arguments[1]:void 0),
A}})
;var $forEach$1=arrayIteration.forEach,STRICT_METHOD$1=arrayMethodIsStrict("forEach"),USES_TO_LENGTH$4=arrayMethodUsesToLength("forEach"),arrayForEach=STRICT_METHOD$1&&USES_TO_LENGTH$4?[].forEach:function(callbackfn){
return $forEach$1(this,callbackfn,arguments.length>1?arguments[1]:void 0)
};_export({target:"Array",proto:!0,
forced:[].forEach!=arrayForEach},{
forEach:arrayForEach})
;var $includes=arrayIncludes.includes,USES_TO_LENGTH$5=arrayMethodUsesToLength("indexOf",{
ACCESSORS:!0,1:0});_export({target:"Array",
proto:!0,forced:!USES_TO_LENGTH$5},{
includes:function(el){
return $includes(this,el,arguments.length>1?arguments[1]:void 0)
}}),addToUnscopables("includes")
;var $indexOf=arrayIncludes.indexOf,nativeIndexOf=[].indexOf,NEGATIVE_ZERO=!!nativeIndexOf&&1/[1].indexOf(1,-0)<0,STRICT_METHOD$2=arrayMethodIsStrict("indexOf"),USES_TO_LENGTH$6=arrayMethodUsesToLength("indexOf",{
ACCESSORS:!0,1:0});_export({target:"Array",
proto:!0,
forced:NEGATIVE_ZERO||!STRICT_METHOD$2||!USES_TO_LENGTH$6
},{indexOf:function(searchElement){
return NEGATIVE_ZERO?nativeIndexOf.apply(this,arguments)||0:$indexOf(this,searchElement,arguments.length>1?arguments[1]:void 0)
}})
;var nativeJoin=[].join,ES3_STRINGS=indexedObject!=Object,STRICT_METHOD$3=arrayMethodIsStrict("join",",")
;_export({target:"Array",proto:!0,
forced:ES3_STRINGS||!STRICT_METHOD$3},{
join:function(separator){
return nativeJoin.call(toIndexedObject(this),void 0===separator?",":separator)
}})
;var min$3=Math.min,nativeLastIndexOf=[].lastIndexOf,NEGATIVE_ZERO$1=!!nativeLastIndexOf&&1/[1].lastIndexOf(1,-0)<0,STRICT_METHOD$4=arrayMethodIsStrict("lastIndexOf"),USES_TO_LENGTH$7=arrayMethodUsesToLength("indexOf",{
ACCESSORS:!0,1:0
}),arrayLastIndexOf=NEGATIVE_ZERO$1||!STRICT_METHOD$4||!USES_TO_LENGTH$7?function(searchElement){
if(NEGATIVE_ZERO$1)return nativeLastIndexOf.apply(this,arguments)||0
;var O=toIndexedObject(this),length=toLength(O.length),index=length-1
;for(arguments.length>1&&(index=min$3(index,toInteger(arguments[1]))),
index<0&&(index=length+index);index>=0;index--)if(index in O&&O[index]===searchElement)return index||0
;return-1}:nativeLastIndexOf;_export({
target:"Array",proto:!0,
forced:arrayLastIndexOf!==[].lastIndexOf},{
lastIndexOf:arrayLastIndexOf})
;var $map=arrayIteration.map,HAS_SPECIES_SUPPORT$1=arrayMethodHasSpeciesSupport("map"),USES_TO_LENGTH$8=arrayMethodUsesToLength("map")
;_export({target:"Array",proto:!0,
forced:!HAS_SPECIES_SUPPORT$1||!USES_TO_LENGTH$8
},{map:function(callbackfn){
return $map(this,callbackfn,arguments.length>1?arguments[1]:void 0)
}});var createMethod$3=function(IS_RIGHT){
return function(that,callbackfn,argumentsLength,memo){
aFunction$1(callbackfn)
;var O=toObject(that),self=indexedObject(O),length=toLength(O.length),index=IS_RIGHT?length-1:0,i=IS_RIGHT?-1:1
;if(argumentsLength<2)for(;;){if(index in self){
memo=self[index],index+=i;break}
if(index+=i,IS_RIGHT?index<0:length<=index)throw TypeError("Reduce of empty array with no initial value")
}
for(;IS_RIGHT?index>=0:length>index;index+=i)index in self&&(memo=callbackfn(memo,self[index],index,O))
;return memo}},arrayReduce={
left:createMethod$3(!1),right:createMethod$3(!0)
},$reduce=arrayReduce.left,STRICT_METHOD$5=arrayMethodIsStrict("reduce"),USES_TO_LENGTH$9=arrayMethodUsesToLength("reduce",{
1:0});_export({target:"Array",proto:!0,
forced:!STRICT_METHOD$5||!USES_TO_LENGTH$9},{
reduce:function(callbackfn){
return $reduce(this,callbackfn,arguments.length,arguments.length>1?arguments[1]:void 0)
}})
;var $reduceRight=arrayReduce.right,STRICT_METHOD$6=arrayMethodIsStrict("reduceRight"),USES_TO_LENGTH$a=arrayMethodUsesToLength("reduce",{
1:0});_export({target:"Array",proto:!0,
forced:!STRICT_METHOD$6||!USES_TO_LENGTH$a},{
reduceRight:function(callbackfn){
return $reduceRight(this,callbackfn,arguments.length,arguments.length>1?arguments[1]:void 0)
}});var nativeReverse=[].reverse,test$1=[1,2]
;_export({target:"Array",proto:!0,
forced:String(test$1)===String(test$1.reverse())
},{reverse:function(){
return isArray(this)&&(this.length=this.length),nativeReverse.call(this)
}})
;var HAS_SPECIES_SUPPORT$2=arrayMethodHasSpeciesSupport("slice"),USES_TO_LENGTH$b=arrayMethodUsesToLength("slice",{
ACCESSORS:!0,0:0,1:2
}),SPECIES$2=wellKnownSymbol("species"),nativeSlice=[].slice,max$1=Math.max
;_export({target:"Array",proto:!0,
forced:!HAS_SPECIES_SUPPORT$2||!USES_TO_LENGTH$b
},{slice:function(start,end){
var Constructor,result,n,O=toIndexedObject(this),length=toLength(O.length),k=toAbsoluteIndex(start,length),fin=toAbsoluteIndex(void 0===end?length:end,length)
;if(isArray(O)&&("function"!=typeof(Constructor=O.constructor)||Constructor!==Array&&!isArray(Constructor.prototype)?isObject(Constructor)&&null===(Constructor=Constructor[SPECIES$2])&&(Constructor=void 0):Constructor=void 0,
Constructor===Array||void 0===Constructor))return nativeSlice.call(O,k,fin)
;for(result=new(void 0===Constructor?Array:Constructor)(max$1(fin-k,0)),
n=0;k<fin;k++,
n++)k in O&&createProperty(result,n,O[k])
;return result.length=n,result}})
;var $some=arrayIteration.some,STRICT_METHOD$7=arrayMethodIsStrict("some"),USES_TO_LENGTH$c=arrayMethodUsesToLength("some")
;_export({target:"Array",proto:!0,
forced:!STRICT_METHOD$7||!USES_TO_LENGTH$c},{
some:function(callbackfn){
return $some(this,callbackfn,arguments.length>1?arguments[1]:void 0)
}})
;var test$2=[],nativeSort=test$2.sort,FAILS_ON_UNDEFINED=fails((function(){
test$2.sort(void 0)
})),FAILS_ON_NULL=fails((function(){
test$2.sort(null)
})),STRICT_METHOD$8=arrayMethodIsStrict("sort")
;_export({target:"Array",proto:!0,
forced:FAILS_ON_UNDEFINED||!FAILS_ON_NULL||!STRICT_METHOD$8
},{sort:function(comparefn){
return void 0===comparefn?nativeSort.call(toObject(this)):nativeSort.call(toObject(this),aFunction$1(comparefn))
}})
;var HAS_SPECIES_SUPPORT$3=arrayMethodHasSpeciesSupport("splice"),USES_TO_LENGTH$d=arrayMethodUsesToLength("splice",{
ACCESSORS:!0,0:0,1:2
}),max$2=Math.max,min$4=Math.min;_export({
target:"Array",proto:!0,
forced:!HAS_SPECIES_SUPPORT$3||!USES_TO_LENGTH$d
},{splice:function(start,deleteCount){
var insertCount,actualDeleteCount,A,k,from,to,O=toObject(this),len=toLength(O.length),actualStart=toAbsoluteIndex(start,len),argumentsLength=arguments.length
;if(0===argumentsLength?insertCount=actualDeleteCount=0:1===argumentsLength?(insertCount=0,
actualDeleteCount=len-actualStart):(insertCount=argumentsLength-2,
actualDeleteCount=min$4(max$2(toInteger(deleteCount),0),len-actualStart)),
len+insertCount-actualDeleteCount>9007199254740991)throw TypeError("Maximum allowed length exceeded")
;for(A=arraySpeciesCreate(O,actualDeleteCount),
k=0;k<actualDeleteCount;k++)(from=actualStart+k)in O&&createProperty(A,k,O[from])
;if(A.length=actualDeleteCount,
insertCount<actualDeleteCount){
for(k=actualStart;k<len-actualDeleteCount;k++)to=k+insertCount,
(from=k+actualDeleteCount)in O?O[to]=O[from]:delete O[to]
;for(k=len;k>len-actualDeleteCount+insertCount;k--)delete O[k-1]
}else if(insertCount>actualDeleteCount)for(k=len-actualDeleteCount;k>actualStart;k--)to=k+insertCount-1,
(from=k+actualDeleteCount-1)in O?O[to]=O[from]:delete O[to]
;for(k=0;k<insertCount;k++)O[k+actualStart]=arguments[k+2]
;return O.length=len-actualDeleteCount+insertCount,
A}})
;var SPECIES$3=wellKnownSymbol("species"),setSpecies=function(CONSTRUCTOR_NAME){
var Constructor=getBuiltIn(CONSTRUCTOR_NAME),defineProperty=objectDefineProperty.f
;descriptors&&Constructor&&!Constructor[SPECIES$3]&&defineProperty(Constructor,SPECIES$3,{
configurable:!0,get:function(){return this}})}
;setSpecies("Array"),addToUnscopables("flat"),
addToUnscopables("flatMap")
;var IteratorPrototype,PrototypeOfArrayIteratorPrototype,arrayIterator,ITERATOR$3=wellKnownSymbol("iterator"),BUGGY_SAFARI_ITERATORS=!1
;[].keys&&("next"in(arrayIterator=[].keys())?(PrototypeOfArrayIteratorPrototype=objectGetPrototypeOf(objectGetPrototypeOf(arrayIterator)))!==Object.prototype&&(IteratorPrototype=PrototypeOfArrayIteratorPrototype):BUGGY_SAFARI_ITERATORS=!0),
null==IteratorPrototype&&(IteratorPrototype={}),
has(IteratorPrototype,ITERATOR$3)||createNonEnumerableProperty(IteratorPrototype,ITERATOR$3,(function(){
return this}));var iteratorsCore={
IteratorPrototype:IteratorPrototype,
BUGGY_SAFARI_ITERATORS:BUGGY_SAFARI_ITERATORS
},IteratorPrototype$1=iteratorsCore.IteratorPrototype,returnThis$1=function(){
return this
},createIteratorConstructor=function(IteratorConstructor,NAME,next){
var TO_STRING_TAG=NAME+" Iterator"
;return IteratorConstructor.prototype=objectCreate(IteratorPrototype$1,{
next:createPropertyDescriptor(1,next)
}),setToStringTag(IteratorConstructor,TO_STRING_TAG,!1),
iterators[TO_STRING_TAG]=returnThis$1,
IteratorConstructor
},IteratorPrototype$2=iteratorsCore.IteratorPrototype,BUGGY_SAFARI_ITERATORS$1=iteratorsCore.BUGGY_SAFARI_ITERATORS,ITERATOR$4=wellKnownSymbol("iterator"),returnThis$2=function(){
return this
},defineIterator=function(Iterable,NAME,IteratorConstructor,next,DEFAULT,IS_SET,FORCED){
createIteratorConstructor(IteratorConstructor,NAME,next)
;var CurrentIteratorPrototype,methods,KEY,getIterationMethod=function(KIND){
if(KIND===DEFAULT&&defaultIterator)return defaultIterator
;if(!BUGGY_SAFARI_ITERATORS$1&&KIND in IterablePrototype)return IterablePrototype[KIND]
;switch(KIND){case"keys":case"values":
case"entries":return function(){
return new IteratorConstructor(this,KIND)}}
return function(){
return new IteratorConstructor(this)}
},TO_STRING_TAG=NAME+" Iterator",INCORRECT_VALUES_NAME=!1,IterablePrototype=Iterable.prototype,nativeIterator=IterablePrototype[ITERATOR$4]||IterablePrototype["@@iterator"]||DEFAULT&&IterablePrototype[DEFAULT],defaultIterator=!BUGGY_SAFARI_ITERATORS$1&&nativeIterator||getIterationMethod(DEFAULT),anyNativeIterator="Array"==NAME&&IterablePrototype.entries||nativeIterator
;if(anyNativeIterator&&(CurrentIteratorPrototype=objectGetPrototypeOf(anyNativeIterator.call(new Iterable)),
IteratorPrototype$2!==Object.prototype&&CurrentIteratorPrototype.next&&(objectGetPrototypeOf(CurrentIteratorPrototype)!==IteratorPrototype$2&&(objectSetPrototypeOf?objectSetPrototypeOf(CurrentIteratorPrototype,IteratorPrototype$2):"function"!=typeof CurrentIteratorPrototype[ITERATOR$4]&&createNonEnumerableProperty(CurrentIteratorPrototype,ITERATOR$4,returnThis$2)),
setToStringTag(CurrentIteratorPrototype,TO_STRING_TAG,!0))),
"values"==DEFAULT&&nativeIterator&&"values"!==nativeIterator.name&&(INCORRECT_VALUES_NAME=!0,
defaultIterator=function(){
return nativeIterator.call(this)
}),IterablePrototype[ITERATOR$4]!==defaultIterator&&createNonEnumerableProperty(IterablePrototype,ITERATOR$4,defaultIterator),
iterators[NAME]=defaultIterator,
DEFAULT)if(methods={
values:getIterationMethod("values"),
keys:IS_SET?defaultIterator:getIterationMethod("keys"),
entries:getIterationMethod("entries")
},FORCED)for(KEY in methods)(BUGGY_SAFARI_ITERATORS$1||INCORRECT_VALUES_NAME||!(KEY in IterablePrototype))&&redefine(IterablePrototype,KEY,methods[KEY]);else _export({
target:NAME,proto:!0,
forced:BUGGY_SAFARI_ITERATORS$1||INCORRECT_VALUES_NAME
},methods);return methods
},setInternalState$1=internalState.set,getInternalState$1=internalState.getterFor("Array Iterator"),es_array_iterator=defineIterator(Array,"Array",(function(iterated,kind){
setInternalState$1(this,{type:"Array Iterator",
target:toIndexedObject(iterated),index:0,kind:kind
})}),(function(){
var state=getInternalState$1(this),target=state.target,kind=state.kind,index=state.index++
;return!target||index>=target.length?(state.target=void 0,
{value:void 0,done:!0}):"keys"==kind?{value:index,
done:!1}:"values"==kind?{value:target[index],
done:!1}:{value:[index,target[index]],done:!1}
}),"values")
;iterators.Arguments=iterators.Array,addToUnscopables("keys"),addToUnscopables("values"),
addToUnscopables("entries")
;var fromCharCode=String.fromCharCode,nativeFromCodePoint=String.fromCodePoint,INCORRECT_LENGTH=!!nativeFromCodePoint&&1!=nativeFromCodePoint.length
;_export({target:"String",stat:!0,
forced:INCORRECT_LENGTH},{
fromCodePoint:function(x){
for(var code,elements=[],length=arguments.length,i=0;length>i;){
if(code=+arguments[i++],
toAbsoluteIndex(code,1114111)!==code)throw RangeError(code+" is not a valid code point")
;elements.push(code<65536?fromCharCode(code):fromCharCode(55296+((code-=65536)>>10),code%1024+56320))
}return elements.join("")}}),_export({
target:"String",stat:!0},{raw:function(template){
for(var rawTemplate=toIndexedObject(template.raw),literalSegments=toLength(rawTemplate.length),argumentsLength=arguments.length,elements=[],i=0;literalSegments>i;)elements.push(String(rawTemplate[i++])),
i<argumentsLength&&elements.push(String(arguments[i]))
;return elements.join("")}})
;var createMethod$4=function(CONVERT_TO_STRING){
return function($this,pos){
var first,second,S=String(requireObjectCoercible($this)),position=toInteger(pos),size=S.length
;return position<0||position>=size?CONVERT_TO_STRING?"":void 0:(first=S.charCodeAt(position))<55296||first>56319||position+1===size||(second=S.charCodeAt(position+1))<56320||second>57343?CONVERT_TO_STRING?S.charAt(position):first:CONVERT_TO_STRING?S.slice(position,position+2):second-56320+(first-55296<<10)+65536
}},stringMultibyte={codeAt:createMethod$4(!1),
charAt:createMethod$4(!0)
},codeAt=stringMultibyte.codeAt;_export({
target:"String",proto:!0},{
codePointAt:function(pos){return codeAt(this,pos)}
})
;var descriptor,MATCH=wellKnownSymbol("match"),isRegexp=function(it){
var isRegExp
;return isObject(it)&&(void 0!==(isRegExp=it[MATCH])?!!isRegExp:"RegExp"==classofRaw(it))
},notARegexp=function(it){
if(isRegexp(it))throw TypeError("The method doesn't accept regular expressions")
;return it
},MATCH$1=wellKnownSymbol("match"),correctIsRegexpLogic=function(METHOD_NAME){
var regexp=/./;try{"/./"[METHOD_NAME](regexp)
}catch(e){try{
return regexp[MATCH$1]=!1,"/./"[METHOD_NAME](regexp)
}catch(f){}}return!1
},getOwnPropertyDescriptor$4=objectGetOwnPropertyDescriptor.f,nativeEndsWith="".endsWith,min$5=Math.min,CORRECT_IS_REGEXP_LOGIC=correctIsRegexpLogic("endsWith"),MDN_POLYFILL_BUG=!(CORRECT_IS_REGEXP_LOGIC||(descriptor=getOwnPropertyDescriptor$4(String.prototype,"endsWith"),
!descriptor||descriptor.writable));_export({
target:"String",proto:!0,
forced:!MDN_POLYFILL_BUG&&!CORRECT_IS_REGEXP_LOGIC
},{endsWith:function(searchString){
var that=String(requireObjectCoercible(this))
;notARegexp(searchString)
;var endPosition=arguments.length>1?arguments[1]:void 0,len=toLength(that.length),end=void 0===endPosition?len:min$5(toLength(endPosition),len),search=String(searchString)
;return nativeEndsWith?nativeEndsWith.call(that,search,end):that.slice(end-search.length,end)===search
}}),_export({target:"String",proto:!0,
forced:!correctIsRegexpLogic("includes")},{
includes:function(searchString){
return!!~String(requireObjectCoercible(this)).indexOf(notARegexp(searchString),arguments.length>1?arguments[1]:void 0)
}});var regexpFlags=function(){
var that=anObject(this),result=""
;return that.global&&(result+="g"),that.ignoreCase&&(result+="i"),
that.multiline&&(result+="m"),
that.dotAll&&(result+="s"),that.unicode&&(result+="u"),
that.sticky&&(result+="y"),result}
;function RE(s,f){return RegExp(s,f)}
var regexpStickyHelpers={
UNSUPPORTED_Y:fails((function(){var re=RE("a","y")
;return re.lastIndex=2,null!=re.exec("abcd")})),
BROKEN_CARET:fails((function(){
var re=RE("^r","gy")
;return re.lastIndex=2,null!=re.exec("str")}))
},nativeExec=RegExp.prototype.exec,nativeReplace=String.prototype.replace,patchedExec=nativeExec,UPDATES_LAST_INDEX_WRONG=function(){
var re1=/a/,re2=/b*/g
;return nativeExec.call(re1,"a"),nativeExec.call(re2,"a"),0!==re1.lastIndex||0!==re2.lastIndex
}(),UNSUPPORTED_Y$1=regexpStickyHelpers.UNSUPPORTED_Y||regexpStickyHelpers.BROKEN_CARET,NPCG_INCLUDED=void 0!==/()??/.exec("")[1]
;(UPDATES_LAST_INDEX_WRONG||NPCG_INCLUDED||UNSUPPORTED_Y$1)&&(patchedExec=function(str){
var lastIndex,reCopy,match,i,re=this,sticky=UNSUPPORTED_Y$1&&re.sticky,flags=regexpFlags.call(re),source=re.source,charsAdded=0,strCopy=str
;return sticky&&(-1===(flags=flags.replace("y","")).indexOf("g")&&(flags+="g"),
strCopy=String(str).slice(re.lastIndex),
re.lastIndex>0&&(!re.multiline||re.multiline&&"\n"!==str[re.lastIndex-1])&&(source="(?: "+source+")",
strCopy=" "+strCopy,
charsAdded++),reCopy=new RegExp("^(?:"+source+")",flags)),NPCG_INCLUDED&&(reCopy=new RegExp("^"+source+"$(?!\\s)",flags)),
UPDATES_LAST_INDEX_WRONG&&(lastIndex=re.lastIndex),
match=nativeExec.call(sticky?reCopy:re,strCopy),
sticky?match?(match.input=match.input.slice(charsAdded),
match[0]=match[0].slice(charsAdded),
match.index=re.lastIndex,re.lastIndex+=match[0].length):re.lastIndex=0:UPDATES_LAST_INDEX_WRONG&&match&&(re.lastIndex=re.global?match.index+match[0].length:lastIndex),
NPCG_INCLUDED&&match&&match.length>1&&nativeReplace.call(match[0],reCopy,(function(){
for(i=1;i<arguments.length-2;i++)void 0===arguments[i]&&(match[i]=void 0)
})),match});var regexpExec=patchedExec;_export({
target:"RegExp",proto:!0,
forced:/./.exec!==regexpExec},{exec:regexpExec})
;var SPECIES$4=wellKnownSymbol("species"),REPLACE_SUPPORTS_NAMED_GROUPS=!fails((function(){
var re=/./;return re.exec=function(){var result=[]
;return result.groups={a:"7"},result
},"7"!=="".replace(re,"$<a>")
})),REPLACE_KEEPS_$0="$0"==="a".replace(/./,"$0"),REPLACE=wellKnownSymbol("replace"),REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE=!!/./[REPLACE]&&""===/./[REPLACE]("a","$0"),SPLIT_WORKS_WITH_OVERWRITTEN_EXEC=!fails((function(){
var re=/(?:)/,originalExec=re.exec
;re.exec=function(){
return originalExec.apply(this,arguments)}
;var result="ab".split(re)
;return 2!==result.length||"a"!==result[0]||"b"!==result[1]
})),fixRegexpWellKnownSymbolLogic=function(KEY,length,exec,sham){
var SYMBOL=wellKnownSymbol(KEY),DELEGATES_TO_SYMBOL=!fails((function(){
var O={};return O[SYMBOL]=function(){return 7
},7!=""[KEY](O)
})),DELEGATES_TO_EXEC=DELEGATES_TO_SYMBOL&&!fails((function(){
var execCalled=!1,re=/a/
;return"split"===KEY&&((re={}).constructor={},re.constructor[SPECIES$4]=function(){
return re
},re.flags="",re[SYMBOL]=/./[SYMBOL]),re.exec=function(){
return execCalled=!0,null
},re[SYMBOL](""),!execCalled}))
;if(!DELEGATES_TO_SYMBOL||!DELEGATES_TO_EXEC||"replace"===KEY&&(!REPLACE_SUPPORTS_NAMED_GROUPS||!REPLACE_KEEPS_$0||REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE)||"split"===KEY&&!SPLIT_WORKS_WITH_OVERWRITTEN_EXEC){
var nativeRegExpMethod=/./[SYMBOL],methods=exec(SYMBOL,""[KEY],(function(nativeMethod,regexp,str,arg2,forceStringMethod){
return regexp.exec===regexpExec?DELEGATES_TO_SYMBOL&&!forceStringMethod?{
done:!0,
value:nativeRegExpMethod.call(regexp,str,arg2)}:{
done:!0,value:nativeMethod.call(str,regexp,arg2)
}:{done:!1}}),{REPLACE_KEEPS_$0:REPLACE_KEEPS_$0,
REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE:REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
}),stringMethod=methods[0],regexMethod=methods[1]
;redefine(String.prototype,KEY,stringMethod),
redefine(RegExp.prototype,SYMBOL,2==length?function(string,arg){
return regexMethod.call(string,this,arg)
}:function(string){
return regexMethod.call(string,this)})}
sham&&createNonEnumerableProperty(RegExp.prototype[SYMBOL],"sham",!0)
},charAt=stringMultibyte.charAt,advanceStringIndex=function(S,index,unicode){
return index+(unicode?charAt(S,index).length:1)
},regexpExecAbstract=function(R,S){var exec=R.exec
;if("function"==typeof exec){
var result=exec.call(R,S)
;if("object"!=typeof result)throw TypeError("RegExp exec method returned something other than an Object or null")
;return result}
if("RegExp"!==classofRaw(R))throw TypeError("RegExp#exec called on incompatible receiver")
;return regexpExec.call(R,S)}
;fixRegexpWellKnownSymbolLogic("match",1,(function(MATCH,nativeMatch,maybeCallNative){
return[function(regexp){
var O=requireObjectCoercible(this),matcher=null==regexp?void 0:regexp[MATCH]
;return void 0!==matcher?matcher.call(regexp,O):new RegExp(regexp)[MATCH](String(O))
},function(regexp){
var res=maybeCallNative(nativeMatch,regexp,this)
;if(res.done)return res.value
;var rx=anObject(regexp),S=String(this)
;if(!rx.global)return regexpExecAbstract(rx,S)
;var fullUnicode=rx.unicode;rx.lastIndex=0
;for(var result,A=[],n=0;null!==(result=regexpExecAbstract(rx,S));){
var matchStr=String(result[0])
;A[n]=matchStr,""===matchStr&&(rx.lastIndex=advanceStringIndex(S,toLength(rx.lastIndex),fullUnicode)),
n++}return 0===n?null:A}]}))
;var SPECIES$5=wellKnownSymbol("species"),speciesConstructor=function(O,defaultConstructor){
var S,C=anObject(O).constructor
;return void 0===C||null==(S=anObject(C)[SPECIES$5])?defaultConstructor:aFunction$1(S)
},MATCH_ALL=wellKnownSymbol("matchAll"),setInternalState$2=internalState.set,getInternalState$2=internalState.getterFor("RegExp String Iterator"),RegExpPrototype=RegExp.prototype,regExpBuiltinExec=RegExpPrototype.exec,nativeMatchAll="".matchAll,WORKS_WITH_NON_GLOBAL_REGEX=!!nativeMatchAll&&!fails((function(){
"a".matchAll(/./)
})),$RegExpStringIterator=createIteratorConstructor((function(regexp,string,global,fullUnicode){
setInternalState$2(this,{
type:"RegExp String Iterator",regexp:regexp,
string:string,global:global,unicode:fullUnicode,
done:!1})}),"RegExp String",(function(){
var state=getInternalState$2(this)
;if(state.done)return{value:void 0,done:!0}
;var R=state.regexp,S=state.string,match=function(R,S){
var result,exec=R.exec
;if("function"==typeof exec){
if("object"!=typeof(result=exec.call(R,S)))throw TypeError("Incorrect exec result")
;return result}return regExpBuiltinExec.call(R,S)
}(R,S);return null===match?{value:void 0,
done:state.done=!0
}:state.global?(""==String(match[0])&&(R.lastIndex=advanceStringIndex(S,toLength(R.lastIndex),state.unicode)),
{value:match,done:!1}):(state.done=!0,{
value:match,done:!1})
})),$matchAll=function(string){
var C,flagsValue,flags,matcher,global,fullUnicode,R=anObject(this),S=String(string)
;return C=speciesConstructor(R,RegExp),
void 0===(flagsValue=R.flags)&&R instanceof RegExp&&!("flags"in RegExpPrototype)&&(flagsValue=regexpFlags.call(R)),
flags=void 0===flagsValue?"":String(flagsValue),
matcher=new C(C===RegExp?R.source:R,flags),
global=!!~flags.indexOf("g"),fullUnicode=!!~flags.indexOf("u"),
matcher.lastIndex=toLength(R.lastIndex),
new $RegExpStringIterator(matcher,S,global,fullUnicode)
};_export({target:"String",proto:!0,
forced:WORKS_WITH_NON_GLOBAL_REGEX},{
matchAll:function(regexp){
var S,matcher,O=requireObjectCoercible(this)
;if(null!=regexp){
if(isRegexp(regexp)&&!~String(requireObjectCoercible("flags"in RegExpPrototype?regexp.flags:regexpFlags.call(regexp))).indexOf("g"))throw TypeError("`.matchAll` does not allow non-global regexes")
;if(WORKS_WITH_NON_GLOBAL_REGEX)return nativeMatchAll.apply(O,arguments)
;if(null!=(matcher=regexp[MATCH_ALL]))return aFunction$1(matcher).call(regexp,O)
}else if(WORKS_WITH_NON_GLOBAL_REGEX)return nativeMatchAll.apply(O,arguments)
;return S=String(O),
new RegExp(regexp,"g")[MATCH_ALL](S)}
}),MATCH_ALL in RegExpPrototype||createNonEnumerableProperty(RegExpPrototype,MATCH_ALL,$matchAll)
;var stringRepeat="".repeat||function(count){
var str=String(requireObjectCoercible(this)),result="",n=toInteger(count)
;if(n<0||n==1/0)throw RangeError("Wrong number of repetitions")
;for(;n>0;(n>>>=1)&&(str+=str))1&n&&(result+=str)
;return result
},ceil$1=Math.ceil,createMethod$5=function(IS_END){
return function($this,maxLength,fillString){
var fillLen,stringFiller,S=String(requireObjectCoercible($this)),stringLength=S.length,fillStr=void 0===fillString?" ":String(fillString),intMaxLength=toLength(maxLength)
;return intMaxLength<=stringLength||""==fillStr?S:(fillLen=intMaxLength-stringLength,
(stringFiller=stringRepeat.call(fillStr,ceil$1(fillLen/fillStr.length))).length>fillLen&&(stringFiller=stringFiller.slice(0,fillLen)),
IS_END?S+stringFiller:stringFiller+S)}
},stringPad={start:createMethod$5(!1),
end:createMethod$5(!0)
},stringPadWebkitBug=/Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(engineUserAgent),$padEnd=stringPad.end
;_export({target:"String",proto:!0,
forced:stringPadWebkitBug},{
padEnd:function(maxLength){
return $padEnd(this,maxLength,arguments.length>1?arguments[1]:void 0)
}});var $padStart=stringPad.start;_export({
target:"String",proto:!0,forced:stringPadWebkitBug
},{padStart:function(maxLength){
return $padStart(this,maxLength,arguments.length>1?arguments[1]:void 0)
}}),_export({target:"String",proto:!0},{
repeat:stringRepeat})
;var max$3=Math.max,min$6=Math.min,floor$1=Math.floor,SUBSTITUTION_SYMBOLS=/\$([$&'`]|\d\d?|<[^>]*>)/g,SUBSTITUTION_SYMBOLS_NO_NAMED=/\$([$&'`]|\d\d?)/g
;fixRegexpWellKnownSymbolLogic("replace",2,(function(REPLACE,nativeReplace,maybeCallNative,reason){
var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE=reason.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE,REPLACE_KEEPS_$0=reason.REPLACE_KEEPS_$0,UNSAFE_SUBSTITUTE=REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE?"$":"$0"
;return[function(searchValue,replaceValue){
var O=requireObjectCoercible(this),replacer=null==searchValue?void 0:searchValue[REPLACE]
;return void 0!==replacer?replacer.call(searchValue,O,replaceValue):nativeReplace.call(String(O),searchValue,replaceValue)
},function(regexp,replaceValue){
if(!REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE&&REPLACE_KEEPS_$0||"string"==typeof replaceValue&&-1===replaceValue.indexOf(UNSAFE_SUBSTITUTE)){
var res=maybeCallNative(nativeReplace,regexp,this,replaceValue)
;if(res.done)return res.value}
var rx=anObject(regexp),S=String(this),functionalReplace="function"==typeof replaceValue
;functionalReplace||(replaceValue=String(replaceValue))
;var global=rx.global;if(global){
var fullUnicode=rx.unicode;rx.lastIndex=0}
for(var results=[];;){
var result=regexpExecAbstract(rx,S)
;if(null===result)break
;if(results.push(result),!global)break
;""===String(result[0])&&(rx.lastIndex=advanceStringIndex(S,toLength(rx.lastIndex),fullUnicode))
}
for(var it,accumulatedResult="",nextSourcePosition=0,i=0;i<results.length;i++){
result=results[i]
;for(var matched=String(result[0]),position=max$3(min$6(toInteger(result.index),S.length),0),captures=[],j=1;j<result.length;j++)captures.push(void 0===(it=result[j])?it:String(it))
;var namedCaptures=result.groups
;if(functionalReplace){
var replacerArgs=[matched].concat(captures,position,S)
;void 0!==namedCaptures&&replacerArgs.push(namedCaptures)
;var replacement=String(replaceValue.apply(void 0,replacerArgs))
}else replacement=getSubstitution(matched,S,position,captures,namedCaptures,replaceValue)
;position>=nextSourcePosition&&(accumulatedResult+=S.slice(nextSourcePosition,position)+replacement,
nextSourcePosition=position+matched.length)}
return accumulatedResult+S.slice(nextSourcePosition)
}]
;function getSubstitution(matched,str,position,captures,namedCaptures,replacement){
var tailPos=position+matched.length,m=captures.length,symbols=SUBSTITUTION_SYMBOLS_NO_NAMED
;return void 0!==namedCaptures&&(namedCaptures=toObject(namedCaptures),
symbols=SUBSTITUTION_SYMBOLS),
nativeReplace.call(replacement,symbols,(function(match,ch){
var capture;switch(ch.charAt(0)){case"$":return"$"
;case"&":return matched;case"`":
return str.slice(0,position);case"'":
return str.slice(tailPos);case"<":
capture=namedCaptures[ch.slice(1,-1)];break
;default:var n=+ch;if(0===n)return match;if(n>m){
var f=floor$1(n/10)
;return 0===f?match:f<=m?void 0===captures[f-1]?ch.charAt(1):captures[f-1]+ch.charAt(1):match
}capture=captures[n-1]}
return void 0===capture?"":capture}))}
})),fixRegexpWellKnownSymbolLogic("search",1,(function(SEARCH,nativeSearch,maybeCallNative){
return[function(regexp){
var O=requireObjectCoercible(this),searcher=null==regexp?void 0:regexp[SEARCH]
;return void 0!==searcher?searcher.call(regexp,O):new RegExp(regexp)[SEARCH](String(O))
},function(regexp){
var res=maybeCallNative(nativeSearch,regexp,this)
;if(res.done)return res.value
;var rx=anObject(regexp),S=String(this),previousLastIndex=rx.lastIndex
;sameValue(previousLastIndex,0)||(rx.lastIndex=0)
;var result=regexpExecAbstract(rx,S)
;return sameValue(rx.lastIndex,previousLastIndex)||(rx.lastIndex=previousLastIndex),
null===result?-1:result.index}]}))
;var arrayPush=[].push,min$7=Math.min,SUPPORTS_Y=!fails((function(){
return!RegExp(4294967295,"y")}))
;fixRegexpWellKnownSymbolLogic("split",2,(function(SPLIT,nativeSplit,maybeCallNative){
var internalSplit
;return internalSplit="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(separator,limit){
var string=String(requireObjectCoercible(this)),lim=void 0===limit?4294967295:limit>>>0
;if(0===lim)return[]
;if(void 0===separator)return[string]
;if(!isRegexp(separator))return nativeSplit.call(string,separator,lim)
;for(var match,lastIndex,lastLength,output=[],flags=(separator.ignoreCase?"i":"")+(separator.multiline?"m":"")+(separator.unicode?"u":"")+(separator.sticky?"y":""),lastLastIndex=0,separatorCopy=new RegExp(separator.source,flags+"g");(match=regexpExec.call(separatorCopy,string))&&!((lastIndex=separatorCopy.lastIndex)>lastLastIndex&&(output.push(string.slice(lastLastIndex,match.index)),
match.length>1&&match.index<string.length&&arrayPush.apply(output,match.slice(1)),
lastLength=match[0].length,
lastLastIndex=lastIndex,output.length>=lim));)separatorCopy.lastIndex===match.index&&separatorCopy.lastIndex++
;return lastLastIndex===string.length?!lastLength&&separatorCopy.test("")||output.push(""):output.push(string.slice(lastLastIndex)),
output.length>lim?output.slice(0,lim):output
}:"0".split(void 0,0).length?function(separator,limit){
return void 0===separator&&0===limit?[]:nativeSplit.call(this,separator,limit)
}:nativeSplit,[function(separator,limit){
var O=requireObjectCoercible(this),splitter=null==separator?void 0:separator[SPLIT]
;return void 0!==splitter?splitter.call(separator,O,limit):internalSplit.call(String(O),separator,limit)
},function(regexp,limit){
var res=maybeCallNative(internalSplit,regexp,this,limit,internalSplit!==nativeSplit)
;if(res.done)return res.value
;var rx=anObject(regexp),S=String(this),C=speciesConstructor(rx,RegExp),unicodeMatching=rx.unicode,flags=(rx.ignoreCase?"i":"")+(rx.multiline?"m":"")+(rx.unicode?"u":"")+(SUPPORTS_Y?"y":"g"),splitter=new C(SUPPORTS_Y?rx:"^(?:"+rx.source+")",flags),lim=void 0===limit?4294967295:limit>>>0
;if(0===lim)return[]
;if(0===S.length)return null===regexpExecAbstract(splitter,S)?[S]:[]
;for(var p=0,q=0,A=[];q<S.length;){
splitter.lastIndex=SUPPORTS_Y?q:0
;var e,z=regexpExecAbstract(splitter,SUPPORTS_Y?S:S.slice(q))
;if(null===z||(e=min$7(toLength(splitter.lastIndex+(SUPPORTS_Y?0:q)),S.length))===p)q=advanceStringIndex(S,q,unicodeMatching);else{
if(A.push(S.slice(p,q)),A.length===lim)return A
;for(var i=1;i<=z.length-1;i++)if(A.push(z[i]),
A.length===lim)return A;q=p=e}}
return A.push(S.slice(p)),A}]}),!SUPPORTS_Y)
;var getOwnPropertyDescriptor$5=objectGetOwnPropertyDescriptor.f,nativeStartsWith="".startsWith,min$8=Math.min,CORRECT_IS_REGEXP_LOGIC$1=correctIsRegexpLogic("startsWith"),MDN_POLYFILL_BUG$1=!CORRECT_IS_REGEXP_LOGIC$1&&!!function(){
var descriptor=getOwnPropertyDescriptor$5(String.prototype,"startsWith")
;return descriptor&&!descriptor.writable}()
;_export({target:"String",proto:!0,
forced:!MDN_POLYFILL_BUG$1&&!CORRECT_IS_REGEXP_LOGIC$1
},{startsWith:function(searchString){
var that=String(requireObjectCoercible(this))
;notARegexp(searchString)
;var index=toLength(min$8(arguments.length>1?arguments[1]:void 0,that.length)),search=String(searchString)
;return nativeStartsWith?nativeStartsWith.call(that,search,index):that.slice(index,index+search.length)===search
}})
;var whitespaces="\t\n\v\f\r                　\u2028\u2029\ufeff",whitespace="["+whitespaces+"]",ltrim=RegExp("^"+whitespace+whitespace+"*"),rtrim=RegExp(whitespace+whitespace+"*$"),createMethod$6=function(TYPE){
return function($this){
var string=String(requireObjectCoercible($this))
;return 1&TYPE&&(string=string.replace(ltrim,"")),
2&TYPE&&(string=string.replace(rtrim,"")),string}
},stringTrim={start:createMethod$6(1),
end:createMethod$6(2),trim:createMethod$6(3)
},stringTrimForced=function(METHOD_NAME){
return fails((function(){
return!!whitespaces[METHOD_NAME]()||"​᠎"!="​᠎"[METHOD_NAME]()||whitespaces[METHOD_NAME].name!==METHOD_NAME
}))},$trim=stringTrim.trim;_export({
target:"String",proto:!0,
forced:stringTrimForced("trim")},{trim:function(){
return $trim(this)}})
;var $trimStart=stringTrim.start,FORCED$4=stringTrimForced("trimStart"),trimStart=FORCED$4?function(){
return $trimStart(this)}:"".trimStart;_export({
target:"String",proto:!0,forced:FORCED$4},{
trimStart:trimStart,trimLeft:trimStart})
;var $trimEnd=stringTrim.end,FORCED$5=stringTrimForced("trimEnd"),trimEnd=FORCED$5?function(){
return $trimEnd(this)}:"".trimEnd;_export({
target:"String",proto:!0,forced:FORCED$5},{
trimEnd:trimEnd,trimRight:trimEnd})
;var charAt$1=stringMultibyte.charAt,setInternalState$3=internalState.set,getInternalState$3=internalState.getterFor("String Iterator")
;defineIterator(String,"String",(function(iterated){
setInternalState$3(this,{type:"String Iterator",
string:String(iterated),index:0})}),(function(){
var point,state=getInternalState$3(this),string=state.string,index=state.index
;return index>=string.length?{value:void 0,done:!0
}:(point=charAt$1(string,index),
state.index+=point.length,{value:point,done:!1})
}))
;var quot=/"/g,createHtml=function(string,tag,attribute,value){
var S=String(requireObjectCoercible(string)),p1="<"+tag
;return""!==attribute&&(p1+=" "+attribute+'="'+String(value).replace(quot,"&quot;")+'"'),
p1+">"+S+"</"+tag+">"
},stringHtmlForced=function(METHOD_NAME){
return fails((function(){
var test=""[METHOD_NAME]('"')
;return test!==test.toLowerCase()||test.split('"').length>3
}))};_export({target:"String",proto:!0,
forced:stringHtmlForced("anchor")},{
anchor:function(name){
return createHtml(this,"a","name",name)}
}),_export({target:"String",proto:!0,
forced:stringHtmlForced("big")},{big:function(){
return createHtml(this,"big","","")}}),_export({
target:"String",proto:!0,
forced:stringHtmlForced("blink")},{
blink:function(){
return createHtml(this,"blink","","")}}),_export({
target:"String",proto:!0,
forced:stringHtmlForced("bold")},{bold:function(){
return createHtml(this,"b","","")}}),_export({
target:"String",proto:!0,
forced:stringHtmlForced("fixed")},{
fixed:function(){
return createHtml(this,"tt","","")}}),_export({
target:"String",proto:!0,
forced:stringHtmlForced("fontcolor")},{
fontcolor:function(color){
return createHtml(this,"font","color",color)}
}),_export({target:"String",proto:!0,
forced:stringHtmlForced("fontsize")},{
fontsize:function(size){
return createHtml(this,"font","size",size)}
}),_export({target:"String",proto:!0,
forced:stringHtmlForced("italics")},{
italics:function(){
return createHtml(this,"i","","")}}),_export({
target:"String",proto:!0,
forced:stringHtmlForced("link")},{
link:function(url){
return createHtml(this,"a","href",url)}
}),_export({target:"String",proto:!0,
forced:stringHtmlForced("small")},{
small:function(){
return createHtml(this,"small","","")}}),_export({
target:"String",proto:!0,
forced:stringHtmlForced("strike")},{
strike:function(){
return createHtml(this,"strike","","")}
}),_export({target:"String",proto:!0,
forced:stringHtmlForced("sub")},{sub:function(){
return createHtml(this,"sub","","")}}),_export({
target:"String",proto:!0,
forced:stringHtmlForced("sup")},{sup:function(){
return createHtml(this,"sup","","")}})
;var inheritIfRequired=function($this,dummy,Wrapper){
var NewTarget,NewTargetPrototype
;return objectSetPrototypeOf&&"function"==typeof(NewTarget=dummy.constructor)&&NewTarget!==Wrapper&&isObject(NewTargetPrototype=NewTarget.prototype)&&NewTargetPrototype!==Wrapper.prototype&&objectSetPrototypeOf($this,NewTargetPrototype),
$this
},defineProperty$6=objectDefineProperty.f,getOwnPropertyNames=objectGetOwnPropertyNames.f,setInternalState$4=internalState.set,MATCH$2=wellKnownSymbol("match"),NativeRegExp=global_1.RegExp,RegExpPrototype$1=NativeRegExp.prototype,re1=/a/g,re2=/a/g,CORRECT_NEW=new NativeRegExp(re1)!==re1,UNSUPPORTED_Y$2=regexpStickyHelpers.UNSUPPORTED_Y
;if(descriptors&&isForced_1("RegExp",!CORRECT_NEW||UNSUPPORTED_Y$2||fails((function(){
return re2[MATCH$2]=!1,
NativeRegExp(re1)!=re1||NativeRegExp(re2)==re2||"/a/i"!=NativeRegExp(re1,"i")
})))){
for(var RegExpWrapper=function(pattern,flags){
var sticky,thisIsRegExp=this instanceof RegExpWrapper,patternIsRegExp=isRegexp(pattern),flagsAreUndefined=void 0===flags
;if(!thisIsRegExp&&patternIsRegExp&&pattern.constructor===RegExpWrapper&&flagsAreUndefined)return pattern
;CORRECT_NEW?patternIsRegExp&&!flagsAreUndefined&&(pattern=pattern.source):pattern instanceof RegExpWrapper&&(flagsAreUndefined&&(flags=regexpFlags.call(pattern)),
pattern=pattern.source),
UNSUPPORTED_Y$2&&(sticky=!!flags&&flags.indexOf("y")>-1)&&(flags=flags.replace(/y/g,""))
;var result=inheritIfRequired(CORRECT_NEW?new NativeRegExp(pattern,flags):NativeRegExp(pattern,flags),thisIsRegExp?this:RegExpPrototype$1,RegExpWrapper)
;return UNSUPPORTED_Y$2&&sticky&&setInternalState$4(result,{
sticky:sticky}),result},proxy=function(key){
key in RegExpWrapper||defineProperty$6(RegExpWrapper,key,{
configurable:!0,get:function(){
return NativeRegExp[key]},set:function(it){
NativeRegExp[key]=it}})
},keys$1=getOwnPropertyNames(NativeRegExp),index=0;keys$1.length>index;)proxy(keys$1[index++])
;RegExpPrototype$1.constructor=RegExpWrapper,
RegExpWrapper.prototype=RegExpPrototype$1,
redefine(global_1,"RegExp",RegExpWrapper)}
setSpecies("RegExp"),descriptors&&("g"!=/./g.flags||regexpStickyHelpers.UNSUPPORTED_Y)&&objectDefineProperty.f(RegExp.prototype,"flags",{
configurable:!0,get:regexpFlags})
;var UNSUPPORTED_Y$4=regexpStickyHelpers.UNSUPPORTED_Y,defineProperty$7=objectDefineProperty.f,getInternalState$4=internalState.get,RegExpPrototype$2=RegExp.prototype
;descriptors&&UNSUPPORTED_Y$4&&defineProperty$7(RegExp.prototype,"sticky",{
configurable:!0,get:function(){
if(this!==RegExpPrototype$2){
if(this instanceof RegExp)return!!getInternalState$4(this).sticky
;throw TypeError("Incompatible receiver, RegExp required")
}}});var DELEGATES_TO_EXEC=function(){
var execCalled=!1,re=/[ac]/
;return re.exec=function(){
return execCalled=!0,/./.exec.apply(this,arguments)
},!0===re.test("abc")&&execCalled
}(),nativeTest=/./.test;_export({target:"RegExp",
proto:!0,forced:!DELEGATES_TO_EXEC},{
test:function(str){
if("function"!=typeof this.exec)return nativeTest.call(this,str)
;var result=this.exec(str)
;if(null!==result&&!isObject(result))throw new Error("RegExp exec method returned something other than an Object or null")
;return!!result}})
;var RegExpPrototype$3=RegExp.prototype,nativeToString=RegExpPrototype$3.toString,NOT_GENERIC=fails((function(){
return"/a/b"!=nativeToString.call({source:"a",
flags:"b"})
})),INCORRECT_NAME="toString"!=nativeToString.name
;(NOT_GENERIC||INCORRECT_NAME)&&redefine(RegExp.prototype,"toString",(function(){
var R=anObject(this),p=String(R.source),rf=R.flags
;return"/"+p+"/"+String(void 0===rf&&R instanceof RegExp&&!("flags"in RegExpPrototype$3)?regexpFlags.call(R):rf)
}),{unsafe:!0})
;var trim=stringTrim.trim,$parseInt=global_1.parseInt,hex=/^[+-]?0[Xx]/,numberParseInt=8!==$parseInt(whitespaces+"08")||22!==$parseInt(whitespaces+"0x16")?function(string,radix){
var S=trim(String(string))
;return $parseInt(S,radix>>>0||(hex.test(S)?16:10))
}:$parseInt;_export({global:!0,
forced:parseInt!=numberParseInt},{
parseInt:numberParseInt})
;var trim$1=stringTrim.trim,$parseFloat=global_1.parseFloat,numberParseFloat=1/$parseFloat(whitespaces+"-0")!=-1/0?function(string){
var trimmedString=trim$1(String(string)),result=$parseFloat(trimmedString)
;return 0===result&&"-"==trimmedString.charAt(0)?-0:result
}:$parseFloat;_export({global:!0,
forced:parseFloat!=numberParseFloat},{
parseFloat:numberParseFloat})
;var getOwnPropertyNames$1=objectGetOwnPropertyNames.f,getOwnPropertyDescriptor$6=objectGetOwnPropertyDescriptor.f,defineProperty$8=objectDefineProperty.f,trim$2=stringTrim.trim,NativeNumber=global_1.Number,NumberPrototype=NativeNumber.prototype,BROKEN_CLASSOF="Number"==classofRaw(objectCreate(NumberPrototype)),toNumber=function(argument){
var first,third,radix,maxCode,digits,length,index,code,it=toPrimitive(argument,!1)
;if("string"==typeof it&&it.length>2)if(43===(first=(it=trim$2(it)).charCodeAt(0))||45===first){
if(88===(third=it.charCodeAt(2))||120===third)return NaN
}else if(48===first){switch(it.charCodeAt(1)){
case 66:case 98:radix=2,maxCode=49;break;case 79:
case 111:radix=8,maxCode=55;break;default:
return+it}
for(length=(digits=it.slice(2)).length,index=0;index<length;index++)if((code=digits.charCodeAt(index))<48||code>maxCode)return NaN
;return parseInt(digits,radix)}return+it}
;if(isForced_1("Number",!NativeNumber(" 0o1")||!NativeNumber("0b1")||NativeNumber("+0x1"))){
for(var key,NumberWrapper=function(value){
var it=arguments.length<1?0:value,dummy=this
;return dummy instanceof NumberWrapper&&(BROKEN_CLASSOF?fails((function(){
NumberPrototype.valueOf.call(dummy)
})):"Number"!=classofRaw(dummy))?inheritIfRequired(new NativeNumber(toNumber(it)),dummy,NumberWrapper):toNumber(it)
},keys$2=descriptors?getOwnPropertyNames$1(NativeNumber):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),j=0;keys$2.length>j;j++)has(NativeNumber,key=keys$2[j])&&!has(NumberWrapper,key)&&defineProperty$8(NumberWrapper,key,getOwnPropertyDescriptor$6(NativeNumber,key))
;NumberWrapper.prototype=NumberPrototype,
NumberPrototype.constructor=NumberWrapper,
redefine(global_1,"Number",NumberWrapper)}
_export({target:"Number",stat:!0},{
EPSILON:Math.pow(2,-52)})
;var globalIsFinite=global_1.isFinite,numberIsFinite=Number.isFinite||function(it){
return"number"==typeof it&&globalIsFinite(it)}
;_export({target:"Number",stat:!0},{
isFinite:numberIsFinite})
;var floor$2=Math.floor,isInteger=function(it){
return!isObject(it)&&isFinite(it)&&floor$2(it)===it
};_export({target:"Number",stat:!0},{
isInteger:isInteger}),_export({target:"Number",
stat:!0},{isNaN:function(number){
return number!=number}});var abs=Math.abs
;_export({target:"Number",stat:!0},{
isSafeInteger:function(number){
return isInteger(number)&&abs(number)<=9007199254740991
}}),_export({target:"Number",stat:!0},{
MAX_SAFE_INTEGER:9007199254740991}),_export({
target:"Number",stat:!0},{
MIN_SAFE_INTEGER:-9007199254740991}),_export({
target:"Number",stat:!0,
forced:Number.parseFloat!=numberParseFloat},{
parseFloat:numberParseFloat}),_export({
target:"Number",stat:!0,
forced:Number.parseInt!=numberParseInt},{
parseInt:numberParseInt})
;var thisNumberValue=function(value){
if("number"!=typeof value&&"Number"!=classofRaw(value))throw TypeError("Incorrect invocation")
;return+value
},nativeToFixed=1..toFixed,floor$3=Math.floor,pow=function(x,n,acc){
return 0===n?acc:n%2==1?pow(x,n-1,acc*x):pow(x*x,n/2,acc)
},FORCED$9=nativeToFixed&&("0.000"!==8e-5.toFixed(3)||"1"!==.9.toFixed(0)||"1.25"!==1.255.toFixed(2)||"1000000000000000128"!==(0xde0b6b3a7640080).toFixed(0))||!fails((function(){
nativeToFixed.call({})}));_export({
target:"Number",proto:!0,forced:FORCED$9},{
toFixed:function(fractionDigits){
var e,z,j,k,number=thisNumberValue(this),fractDigits=toInteger(fractionDigits),data=[0,0,0,0,0,0],sign="",result="0",multiply=function(n,c){
for(var index=-1,c2=c;++index<6;)c2+=n*data[index],
data[index]=c2%1e7,c2=floor$3(c2/1e7)
},divide=function(n){
for(var index=6,c=0;--index>=0;)c+=data[index],data[index]=floor$3(c/n),
c=c%n*1e7},dataToString=function(){
for(var index=6,s="";--index>=0;)if(""!==s||0===index||0!==data[index]){
var t=String(data[index])
;s=""===s?t:s+stringRepeat.call("0",7-t.length)+t}
return s}
;if(fractDigits<0||fractDigits>20)throw RangeError("Incorrect fraction digits")
;if(number!=number)return"NaN"
;if(number<=-1e21||number>=1e21)return String(number)
;if(number<0&&(sign="-",number=-number),
number>1e-21)if(z=(e=function(x){
for(var n=0,x2=x;x2>=4096;)n+=12,x2/=4096
;for(;x2>=2;)n+=1,x2/=2;return n
}(number*pow(2,69,1))-69)<0?number*pow(2,-e,1):number/pow(2,e,1),
z*=4503599627370496,(e=52-e)>0){
for(multiply(0,z),j=fractDigits;j>=7;)multiply(1e7,0),
j-=7
;for(multiply(pow(10,j,1),0),j=e-1;j>=23;)divide(1<<23),j-=23
;divide(1<<j),multiply(1,1),
divide(2),result=dataToString()
}else multiply(0,z),multiply(1<<-e,0),result=dataToString()+stringRepeat.call("0",fractDigits)
;return result=fractDigits>0?sign+((k=result.length)<=fractDigits?"0."+stringRepeat.call("0",fractDigits-k)+result:result.slice(0,k-fractDigits)+"."+result.slice(k-fractDigits)):sign+result
}})
;var nativeToPrecision=1..toPrecision,FORCED$a=fails((function(){
return"1"!==nativeToPrecision.call(1,void 0)
}))||!fails((function(){nativeToPrecision.call({})
}));_export({target:"Number",proto:!0,
forced:FORCED$a},{toPrecision:function(precision){
return void 0===precision?nativeToPrecision.call(thisNumberValue(this)):nativeToPrecision.call(thisNumberValue(this),precision)
}})
;var log$1=Math.log,mathLog1p=Math.log1p||function(x){
return(x=+x)>-1e-8&&x<1e-8?x-x*x/2:log$1(1+x)
},nativeAcosh=Math.acosh,log$2=Math.log,sqrt=Math.sqrt,LN2=Math.LN2,FORCED$b=!nativeAcosh||710!=Math.floor(nativeAcosh(Number.MAX_VALUE))||nativeAcosh(1/0)!=1/0
;_export({target:"Math",stat:!0,forced:FORCED$b},{
acosh:function(x){
return(x=+x)<1?NaN:x>94906265.62425156?log$2(x)+LN2:mathLog1p(x-1+sqrt(x-1)*sqrt(x+1))
}})
;var nativeAsinh=Math.asinh,log$3=Math.log,sqrt$1=Math.sqrt
;_export({target:"Math",stat:!0,
forced:!(nativeAsinh&&1/nativeAsinh(0)>0)},{
asinh:function asinh(x){
return isFinite(x=+x)&&0!=x?x<0?-asinh(-x):log$3(x+sqrt$1(x*x+1)):x
}});var nativeAtanh=Math.atanh,log$4=Math.log
;_export({target:"Math",stat:!0,
forced:!(nativeAtanh&&1/nativeAtanh(-0)<0)},{
atanh:function(x){
return 0==(x=+x)?x:log$4((1+x)/(1-x))/2}})
;var mathSign=Math.sign||function(x){
return 0==(x=+x)||x!=x?x:x<0?-1:1
},abs$1=Math.abs,pow$1=Math.pow;_export({
target:"Math",stat:!0},{cbrt:function(x){
return mathSign(x=+x)*pow$1(abs$1(x),1/3)}})
;var floor$4=Math.floor,log$5=Math.log,LOG2E=Math.LOG2E
;_export({target:"Math",stat:!0},{
clz32:function(x){
return(x>>>=0)?31-floor$4(log$5(x+.5)*LOG2E):32}})
;var nativeExpm1=Math.expm1,exp=Math.exp,mathExpm1=!nativeExpm1||nativeExpm1(10)>22025.465794806718||nativeExpm1(10)<22025.465794806718||-2e-17!=nativeExpm1(-2e-17)?function(x){
return 0==(x=+x)?x:x>-1e-6&&x<1e-6?x+x*x/2:exp(x)-1
}:nativeExpm1,nativeCosh=Math.cosh,abs$2=Math.abs,E=Math.E
;_export({target:"Math",stat:!0,
forced:!nativeCosh||nativeCosh(710)===1/0},{
cosh:function(x){var t=mathExpm1(abs$2(x)-1)+1
;return(t+1/(t*E*E))*(E/2)}}),_export({
target:"Math",stat:!0,forced:mathExpm1!=Math.expm1
},{expm1:mathExpm1})
;var abs$3=Math.abs,pow$2=Math.pow,EPSILON=pow$2(2,-52),EPSILON32=pow$2(2,-23),MAX32=pow$2(2,127)*(2-EPSILON32),MIN32=pow$2(2,-126),mathFround=Math.fround||function(x){
var a,result,$abs=abs$3(x),$sign=mathSign(x)
;return $abs<MIN32?$sign*($abs/MIN32/EPSILON32+1/EPSILON-1/EPSILON)*MIN32*EPSILON32:(result=(a=(1+EPSILON32/EPSILON)*$abs)-(a-$abs))>MAX32||result!=result?$sign*(1/0):$sign*result
};_export({target:"Math",stat:!0},{
fround:mathFround})
;var $hypot=Math.hypot,abs$4=Math.abs,sqrt$2=Math.sqrt,BUGGY=!!$hypot&&$hypot(1/0,NaN)!==1/0
;_export({target:"Math",stat:!0,forced:BUGGY},{
hypot:function(value1,value2){
for(var arg,div,sum=0,i=0,aLen=arguments.length,larg=0;i<aLen;)larg<(arg=abs$4(arguments[i++]))?(sum=sum*(div=larg/arg)*div+1,
larg=arg):sum+=arg>0?(div=arg/larg)*div:arg
;return larg===1/0?1/0:larg*sqrt$2(sum)}})
;var nativeImul=Math.imul,FORCED$c=fails((function(){
return-5!=nativeImul(4294967295,5)||2!=nativeImul.length
}));_export({target:"Math",stat:!0,forced:FORCED$c
},{imul:function(x,y){
var xn=+x,yn=+y,xl=65535&xn,yl=65535&yn
;return 0|xl*yl+((65535&xn>>>16)*yl+xl*(65535&yn>>>16)<<16>>>0)
}});var log$6=Math.log,LOG10E=Math.LOG10E
;_export({target:"Math",stat:!0},{
log10:function(x){return log$6(x)*LOG10E}
}),_export({target:"Math",stat:!0},{
log1p:mathLog1p})
;var log$7=Math.log,LN2$1=Math.LN2;_export({
target:"Math",stat:!0},{log2:function(x){
return log$7(x)/LN2$1}}),_export({target:"Math",
stat:!0},{sign:mathSign})
;var abs$5=Math.abs,exp$1=Math.exp,E$1=Math.E,FORCED$d=fails((function(){
return-2e-17!=Math.sinh(-2e-17)}));_export({
target:"Math",stat:!0,forced:FORCED$d},{
sinh:function(x){
return abs$5(x=+x)<1?(mathExpm1(x)-mathExpm1(-x))/2:(exp$1(x-1)-exp$1(-x-1))*(E$1/2)
}});var exp$2=Math.exp;_export({target:"Math",
stat:!0},{tanh:function(x){
var a=mathExpm1(x=+x),b=mathExpm1(-x)
;return a==1/0?1:b==1/0?-1:(a-b)/(exp$2(x)+exp$2(-x))
}}),setToStringTag(Math,"Math",!0)
;var ceil$2=Math.ceil,floor$5=Math.floor;_export({
target:"Math",stat:!0},{trunc:function(it){
return(it>0?floor$5:ceil$2)(it)}}),_export({
target:"Date",stat:!0},{now:function(){
return(new Date).getTime()}})
;var FORCED$e=fails((function(){
return null!==new Date(NaN).toJSON()||1!==Date.prototype.toJSON.call({
toISOString:function(){return 1}})}));_export({
target:"Date",proto:!0,forced:FORCED$e},{
toJSON:function(key){
var O=toObject(this),pv=toPrimitive(O)
;return"number"!=typeof pv||isFinite(pv)?O.toISOString():null
}})
;var padStart=stringPad.start,abs$6=Math.abs,DatePrototype=Date.prototype,getTime=DatePrototype.getTime,nativeDateToISOString=DatePrototype.toISOString,dateToIsoString=fails((function(){
return"0385-07-25T07:06:39.999Z"!=nativeDateToISOString.call(new Date(-50000000000001))
}))||!fails((function(){
nativeDateToISOString.call(new Date(NaN))
}))?function(){
if(!isFinite(getTime.call(this)))throw RangeError("Invalid time value")
;var year=this.getUTCFullYear(),milliseconds=this.getUTCMilliseconds(),sign=year<0?"-":year>9999?"+":""
;return sign+padStart(abs$6(year),sign?6:4,0)+"-"+padStart(this.getUTCMonth()+1,2,0)+"-"+padStart(this.getUTCDate(),2,0)+"T"+padStart(this.getUTCHours(),2,0)+":"+padStart(this.getUTCMinutes(),2,0)+":"+padStart(this.getUTCSeconds(),2,0)+"."+padStart(milliseconds,3,0)+"Z"
}:nativeDateToISOString;_export({target:"Date",
proto:!0,
forced:Date.prototype.toISOString!==dateToIsoString
},{toISOString:dateToIsoString})
;var DatePrototype$1=Date.prototype,nativeDateToString=DatePrototype$1.toString,getTime$1=DatePrototype$1.getTime
;new Date(NaN)+""!="Invalid Date"&&redefine(DatePrototype$1,"toString",(function(){
var value=getTime$1.call(this)
;return value==value?nativeDateToString.call(this):"Invalid Date"
}))
;var TO_PRIMITIVE$1=wellKnownSymbol("toPrimitive"),DatePrototype$2=Date.prototype
;TO_PRIMITIVE$1 in DatePrototype$2||createNonEnumerableProperty(DatePrototype$2,TO_PRIMITIVE$1,(function(hint){
if("string"!==hint&&"number"!==hint&&"default"!==hint)throw TypeError("Incorrect hint")
;return toPrimitive(anObject(this),"number"!==hint)
}))
;var $stringify$1=getBuiltIn("JSON","stringify"),re=/[\uD800-\uDFFF]/g,low=/^[\uD800-\uDBFF]$/,hi=/^[\uDC00-\uDFFF]$/,fix=function(match,offset,string){
var prev=string.charAt(offset-1),next=string.charAt(offset+1)
;return low.test(match)&&!hi.test(next)||hi.test(match)&&!low.test(prev)?"\\u"+match.charCodeAt(0).toString(16):match
},FORCED$f=fails((function(){
return'"\\udf06\\ud834"'!==$stringify$1("\udf06\ud834")||'"\\udead"'!==$stringify$1("\udead")
}));$stringify$1&&_export({target:"JSON",stat:!0,
forced:FORCED$f},{
stringify:function(it,replacer,space){
var result=$stringify$1.apply(null,arguments)
;return"string"==typeof result?result.replace(re,fix):result
}}),setToStringTag(global_1.JSON,"JSON",!0)
;var defer,channel,port,nativePromiseConstructor=global_1.Promise,redefineAll=function(target,src,options){
for(var key in src)redefine(target,key,src[key],options)
;return target
},anInstance=function(it,Constructor,name){
if(!(it instanceof Constructor))throw TypeError("Incorrect "+(name?name+" ":"")+"invocation")
;return it
},engineIsIos=/(iphone|ipod|ipad).*applewebkit/i.test(engineUserAgent),location=global_1.location,set$1=global_1.setImmediate,clear=global_1.clearImmediate,process$1=global_1.process,MessageChannel=global_1.MessageChannel,Dispatch=global_1.Dispatch,counter=0,queue={},run=function(id){
if(queue.hasOwnProperty(id)){var fn=queue[id]
;delete queue[id],fn()}},runner=function(id){
return function(){run(id)}
},listener=function(event){run(event.data)
},post=function(id){
global_1.postMessage(id+"",location.protocol+"//"+location.host)
};set$1&&clear||(set$1=function(fn){
for(var args=[],i=1;arguments.length>i;)args.push(arguments[i++])
;return queue[++counter]=function(){
("function"==typeof fn?fn:Function(fn)).apply(void 0,args)
},defer(counter),counter},clear=function(id){
delete queue[id]
},"process"==classofRaw(process$1)?defer=function(id){
process$1.nextTick(runner(id))
}:Dispatch&&Dispatch.now?defer=function(id){
Dispatch.now(runner(id))
}:MessageChannel&&!engineIsIos?(port=(channel=new MessageChannel).port2,
channel.port1.onmessage=listener,
defer=functionBindContext(port.postMessage,port,1)):!global_1.addEventListener||"function"!=typeof postMessage||global_1.importScripts||fails(post)||"file:"===location.protocol?defer="onreadystatechange"in documentCreateElement("script")?function(id){
html.appendChild(documentCreateElement("script")).onreadystatechange=function(){
html.removeChild(this),run(id)}}:function(id){
setTimeout(runner(id),0)
}:(defer=post,global_1.addEventListener("message",listener,!1)))
;var flush,head,last,notify,toggle,node,promise,then,task={
set:set$1,clear:clear
},getOwnPropertyDescriptor$7=objectGetOwnPropertyDescriptor.f,macrotask=task.set,MutationObserver=global_1.MutationObserver||global_1.WebKitMutationObserver,process$2=global_1.process,Promise$1=global_1.Promise,IS_NODE="process"==classofRaw(process$2),queueMicrotaskDescriptor=getOwnPropertyDescriptor$7(global_1,"queueMicrotask"),queueMicrotask=queueMicrotaskDescriptor&&queueMicrotaskDescriptor.value
;queueMicrotask||(flush=function(){var parent,fn
;for(IS_NODE&&(parent=process$2.domain)&&parent.exit();head;){
fn=head.fn,head=head.next;try{fn()}catch(error){
throw head?notify():last=void 0,error}}
last=void 0,parent&&parent.enter()
},IS_NODE?notify=function(){
process$2.nextTick(flush)
}:MutationObserver&&!engineIsIos?(toggle=!0,node=document.createTextNode(""),
new MutationObserver(flush).observe(node,{
characterData:!0}),notify=function(){
node.data=toggle=!toggle
}):Promise$1&&Promise$1.resolve?(promise=Promise$1.resolve(void 0),
then=promise.then,notify=function(){
then.call(promise,flush)}):notify=function(){
macrotask.call(global_1,flush)})
;var Internal,OwnPromiseCapability,PromiseWrapper,nativeThen,microtask=queueMicrotask||function(fn){
var task={fn:fn,next:void 0}
;last&&(last.next=task),head||(head=task,notify()),last=task
},PromiseCapability=function(C){var resolve,reject
;this.promise=new C((function($$resolve,$$reject){
if(void 0!==resolve||void 0!==reject)throw TypeError("Bad Promise constructor")
;resolve=$$resolve,reject=$$reject
})),this.resolve=aFunction$1(resolve),this.reject=aFunction$1(reject)
},newPromiseCapability={f:function(C){
return new PromiseCapability(C)}
},promiseResolve=function(C,x){
if(anObject(C),isObject(x)&&x.constructor===C)return x
;var promiseCapability=newPromiseCapability.f(C)
;return(0,promiseCapability.resolve)(x),
promiseCapability.promise
},hostReportErrors=function(a,b){
var console=global_1.console
;console&&console.error&&(1===arguments.length?console.error(a):console.error(a,b))
},perform=function(exec){try{return{error:!1,
value:exec()}}catch(error){return{error:!0,
value:error}}
},task$1=task.set,SPECIES$6=wellKnownSymbol("species"),PROMISE="Promise",getInternalState$5=internalState.get,setInternalState$5=internalState.set,getInternalPromiseState=internalState.getterFor(PROMISE),PromiseConstructor=nativePromiseConstructor,TypeError$1=global_1.TypeError,document$2=global_1.document,process$3=global_1.process,$fetch=getBuiltIn("fetch"),newPromiseCapability$1=newPromiseCapability.f,newGenericPromiseCapability=newPromiseCapability$1,IS_NODE$1="process"==classofRaw(process$3),DISPATCH_EVENT=!!(document$2&&document$2.createEvent&&global_1.dispatchEvent),FORCED$g=isForced_1(PROMISE,(function(){
if(!(inspectSource(PromiseConstructor)!==String(PromiseConstructor))){
if(66===engineV8Version)return!0
;if(!IS_NODE$1&&"function"!=typeof PromiseRejectionEvent)return!0
}
if(engineV8Version>=51&&/native code/.test(PromiseConstructor))return!1
;var promise=PromiseConstructor.resolve(1),FakePromise=function(exec){
exec((function(){}),(function(){}))}
;return(promise.constructor={})[SPECIES$6]=FakePromise,
!(promise.then((function(){}))instanceof FakePromise)
})),INCORRECT_ITERATION$1=FORCED$g||!checkCorrectnessOfIteration((function(iterable){
PromiseConstructor.all(iterable).catch((function(){}))
})),isThenable=function(it){var then
;return!(!isObject(it)||"function"!=typeof(then=it.then))&&then
},notify$1=function(promise,state,isReject){
if(!state.notified){state.notified=!0
;var chain=state.reactions;microtask((function(){
for(var value=state.value,ok=1==state.state,index=0;chain.length>index;){
var result,then,exited,reaction=chain[index++],handler=ok?reaction.ok:reaction.fail,resolve=reaction.resolve,reject=reaction.reject,domain=reaction.domain
;try{
handler?(ok||(2===state.rejection&&onHandleUnhandled(promise,state),state.rejection=1),
!0===handler?result=value:(domain&&domain.enter(),
result=handler(value),domain&&(domain.exit(),
exited=!0)),result===reaction.promise?reject(TypeError$1("Promise-chain cycle")):(then=isThenable(result))?then.call(result,resolve,reject):resolve(result)):reject(value)
}catch(error){
domain&&!exited&&domain.exit(),reject(error)}}
state.reactions=[],state.notified=!1,
isReject&&!state.rejection&&onUnhandled(promise,state)
}))}},dispatchEvent=function(name,promise,reason){
var event,handler
;DISPATCH_EVENT?((event=document$2.createEvent("Event")).promise=promise,
event.reason=reason,
event.initEvent(name,!1,!0),global_1.dispatchEvent(event)):event={
promise:promise,reason:reason
},(handler=global_1["on"+name])?handler(event):"unhandledrejection"===name&&hostReportErrors("Unhandled promise rejection",reason)
},onUnhandled=function(promise,state){
task$1.call(global_1,(function(){
var result,value=state.value
;if(isUnhandled(state)&&(result=perform((function(){
IS_NODE$1?process$3.emit("unhandledRejection",value,promise):dispatchEvent("unhandledrejection",promise,value)
})),
state.rejection=IS_NODE$1||isUnhandled(state)?2:1,result.error))throw result.value
}))},isUnhandled=function(state){
return 1!==state.rejection&&!state.parent
},onHandleUnhandled=function(promise,state){
task$1.call(global_1,(function(){
IS_NODE$1?process$3.emit("rejectionHandled",promise):dispatchEvent("rejectionhandled",promise,state.value)
}))},bind=function(fn,promise,state,unwrap){
return function(value){
fn(promise,state,value,unwrap)}
},internalReject=function(promise,state,value,unwrap){
state.done||(state.done=!0,
unwrap&&(state=unwrap),state.value=value,state.state=2,
notify$1(promise,state,!0))
},internalResolve=function(promise,state,value,unwrap){
if(!state.done){
state.done=!0,unwrap&&(state=unwrap);try{
if(promise===value)throw TypeError$1("Promise can't be resolved itself")
;var then=isThenable(value)
;then?microtask((function(){var wrapper={done:!1}
;try{
then.call(value,bind(internalResolve,promise,wrapper,state),bind(internalReject,promise,wrapper,state))
}catch(error){
internalReject(promise,wrapper,error,state)}
})):(state.value=value,state.state=1,
notify$1(promise,state,!1))}catch(error){
internalReject(promise,{done:!1},error,state)}}}
;FORCED$g&&(PromiseConstructor=function(executor){
anInstance(this,PromiseConstructor,PROMISE),
aFunction$1(executor),Internal.call(this)
;var state=getInternalState$5(this);try{
executor(bind(internalResolve,this,state),bind(internalReject,this,state))
}catch(error){internalReject(this,state,error)}
},(Internal=function(executor){
setInternalState$5(this,{type:PROMISE,done:!1,
notified:!1,parent:!1,reactions:[],rejection:!1,
state:0,value:void 0})
}).prototype=redefineAll(PromiseConstructor.prototype,{
then:function(onFulfilled,onRejected){
var state=getInternalPromiseState(this),reaction=newPromiseCapability$1(speciesConstructor(this,PromiseConstructor))
;return reaction.ok="function"!=typeof onFulfilled||onFulfilled,
reaction.fail="function"==typeof onRejected&&onRejected,
reaction.domain=IS_NODE$1?process$3.domain:void 0,
state.parent=!0,state.reactions.push(reaction),
0!=state.state&&notify$1(this,state,!1),
reaction.promise},catch:function(onRejected){
return this.then(void 0,onRejected)}
}),OwnPromiseCapability=function(){
var promise=new Internal,state=getInternalState$5(promise)
;this.promise=promise,
this.resolve=bind(internalResolve,promise,state),this.reject=bind(internalReject,promise,state)
},
newPromiseCapability.f=newPromiseCapability$1=function(C){
return C===PromiseConstructor||C===PromiseWrapper?new OwnPromiseCapability(C):newGenericPromiseCapability(C)
},
"function"==typeof nativePromiseConstructor&&(nativeThen=nativePromiseConstructor.prototype.then,
redefine(nativePromiseConstructor.prototype,"then",(function(onFulfilled,onRejected){
var that=this
;return new PromiseConstructor((function(resolve,reject){
nativeThen.call(that,resolve,reject)
})).then(onFulfilled,onRejected)}),{unsafe:!0
}),"function"==typeof $fetch&&_export({global:!0,
enumerable:!0,forced:!0},{fetch:function(input){
return promiseResolve(PromiseConstructor,$fetch.apply(global_1,arguments))
}}))),_export({global:!0,wrap:!0,forced:FORCED$g
},{Promise:PromiseConstructor
}),setToStringTag(PromiseConstructor,PROMISE,!1),setSpecies(PROMISE),
PromiseWrapper=getBuiltIn(PROMISE),_export({
target:PROMISE,stat:!0,forced:FORCED$g},{
reject:function(r){
var capability=newPromiseCapability$1(this)
;return capability.reject.call(void 0,r),
capability.promise}}),_export({target:PROMISE,
stat:!0,forced:FORCED$g},{resolve:function(x){
return promiseResolve(this,x)}}),_export({
target:PROMISE,stat:!0,
forced:INCORRECT_ITERATION$1},{
all:function(iterable){
var C=this,capability=newPromiseCapability$1(C),resolve=capability.resolve,reject=capability.reject,result=perform((function(){
var $promiseResolve=aFunction$1(C.resolve),values=[],counter=0,remaining=1
;iterate_1(iterable,(function(promise){
var index=counter++,alreadyCalled=!1
;values.push(void 0),remaining++,$promiseResolve.call(C,promise).then((function(value){
alreadyCalled||(alreadyCalled=!0,
values[index]=value,--remaining||resolve(values))
}),reject)})),--remaining||resolve(values)}))
;return result.error&&reject(result.value),
capability.promise},race:function(iterable){
var C=this,capability=newPromiseCapability$1(C),reject=capability.reject,result=perform((function(){
var $promiseResolve=aFunction$1(C.resolve)
;iterate_1(iterable,(function(promise){
$promiseResolve.call(C,promise).then(capability.resolve,reject)
}))}))
;return result.error&&reject(result.value),capability.promise
}}),_export({target:"Promise",stat:!0},{
allSettled:function(iterable){
var C=this,capability=newPromiseCapability.f(C),resolve=capability.resolve,reject=capability.reject,result=perform((function(){
var promiseResolve=aFunction$1(C.resolve),values=[],counter=0,remaining=1
;iterate_1(iterable,(function(promise){
var index=counter++,alreadyCalled=!1
;values.push(void 0),remaining++,promiseResolve.call(C,promise).then((function(value){
alreadyCalled||(alreadyCalled=!0,values[index]={
status:"fulfilled",value:value
},--remaining||resolve(values))}),(function(e){
alreadyCalled||(alreadyCalled=!0,values[index]={
status:"rejected",reason:e
},--remaining||resolve(values))}))
})),--remaining||resolve(values)}))
;return result.error&&reject(result.value),capability.promise
}})
;var NON_GENERIC=!!nativePromiseConstructor&&fails((function(){
nativePromiseConstructor.prototype.finally.call({
then:function(){}},(function(){}))}));_export({
target:"Promise",proto:!0,real:!0,
forced:NON_GENERIC},{finally:function(onFinally){
var C=speciesConstructor(this,getBuiltIn("Promise")),isFunction="function"==typeof onFinally
;return this.then(isFunction?function(x){
return promiseResolve(C,onFinally()).then((function(){
return x}))}:onFinally,isFunction?function(e){
return promiseResolve(C,onFinally()).then((function(){
throw e}))}:onFinally)}
}),"function"!=typeof nativePromiseConstructor||nativePromiseConstructor.prototype.finally||redefine(nativePromiseConstructor.prototype,"finally",getBuiltIn("Promise").prototype.finally)
;var collection=function(CONSTRUCTOR_NAME,wrapper,common){
var IS_MAP=-1!==CONSTRUCTOR_NAME.indexOf("Map"),IS_WEAK=-1!==CONSTRUCTOR_NAME.indexOf("Weak"),ADDER=IS_MAP?"set":"add",NativeConstructor=global_1[CONSTRUCTOR_NAME],NativePrototype=NativeConstructor&&NativeConstructor.prototype,Constructor=NativeConstructor,exported={},fixMethod=function(KEY){
var nativeMethod=NativePrototype[KEY]
;redefine(NativePrototype,KEY,"add"==KEY?function(value){
return nativeMethod.call(this,0===value?0:value),
this}:"delete"==KEY?function(key){
return!(IS_WEAK&&!isObject(key))&&nativeMethod.call(this,0===key?0:key)
}:"get"==KEY?function(key){
return IS_WEAK&&!isObject(key)?void 0:nativeMethod.call(this,0===key?0:key)
}:"has"==KEY?function(key){
return!(IS_WEAK&&!isObject(key))&&nativeMethod.call(this,0===key?0:key)
}:function(key,value){
return nativeMethod.call(this,0===key?0:key,value),this
})}
;if(isForced_1(CONSTRUCTOR_NAME,"function"!=typeof NativeConstructor||!(IS_WEAK||NativePrototype.forEach&&!fails((function(){
(new NativeConstructor).entries().next()
})))))Constructor=common.getConstructor(wrapper,CONSTRUCTOR_NAME,IS_MAP,ADDER),
internalMetadata.REQUIRED=!0;else if(isForced_1(CONSTRUCTOR_NAME,!0)){
var instance=new Constructor,HASNT_CHAINING=instance[ADDER](IS_WEAK?{}:-0,1)!=instance,THROWS_ON_PRIMITIVES=fails((function(){
instance.has(1)
})),ACCEPT_ITERABLES=checkCorrectnessOfIteration((function(iterable){
new NativeConstructor(iterable)
})),BUGGY_ZERO=!IS_WEAK&&fails((function(){
for(var $instance=new NativeConstructor,index=5;index--;)$instance[ADDER](index,index)
;return!$instance.has(-0)}))
;ACCEPT_ITERABLES||((Constructor=wrapper((function(dummy,iterable){
anInstance(dummy,Constructor,CONSTRUCTOR_NAME)
;var that=inheritIfRequired(new NativeConstructor,dummy,Constructor)
;return null!=iterable&&iterate_1(iterable,that[ADDER],that,IS_MAP),
that
}))).prototype=NativePrototype,NativePrototype.constructor=Constructor),(THROWS_ON_PRIMITIVES||BUGGY_ZERO)&&(fixMethod("delete"),
fixMethod("has"),
IS_MAP&&fixMethod("get")),(BUGGY_ZERO||HASNT_CHAINING)&&fixMethod(ADDER),
IS_WEAK&&NativePrototype.clear&&delete NativePrototype.clear
}
return exported[CONSTRUCTOR_NAME]=Constructor,_export({
global:!0,forced:Constructor!=NativeConstructor
},exported),setToStringTag(Constructor,CONSTRUCTOR_NAME),
IS_WEAK||common.setStrong(Constructor,CONSTRUCTOR_NAME,IS_MAP),
Constructor
},defineProperty$9=objectDefineProperty.f,fastKey=internalMetadata.fastKey,setInternalState$6=internalState.set,internalStateGetterFor=internalState.getterFor,collectionStrong={
getConstructor:function(wrapper,CONSTRUCTOR_NAME,IS_MAP,ADDER){
var C=wrapper((function(that,iterable){
anInstance(that,C,CONSTRUCTOR_NAME),setInternalState$6(that,{
type:CONSTRUCTOR_NAME,index:objectCreate(null),
first:void 0,last:void 0,size:0
}),descriptors||(that.size=0),null!=iterable&&iterate_1(iterable,that[ADDER],that,IS_MAP)
})),getInternalState=internalStateGetterFor(CONSTRUCTOR_NAME),define=function(that,key,value){
var previous,index,state=getInternalState(that),entry=getEntry(that,key)
;return entry?entry.value=value:(state.last=entry={
index:index=fastKey(key,!0),key:key,value:value,
previous:previous=state.last,next:void 0,
removed:!1
},state.first||(state.first=entry),previous&&(previous.next=entry),descriptors?state.size++:that.size++,
"F"!==index&&(state.index[index]=entry)),that
},getEntry=function(that,key){
var entry,state=getInternalState(that),index=fastKey(key)
;if("F"!==index)return state.index[index]
;for(entry=state.first;entry;entry=entry.next)if(entry.key==key)return entry
};return redefineAll(C.prototype,{
clear:function(){
for(var state=getInternalState(this),data=state.index,entry=state.first;entry;)entry.removed=!0,
entry.previous&&(entry.previous=entry.previous.next=void 0),
delete data[entry.index],entry=entry.next
;state.first=state.last=void 0,descriptors?state.size=0:this.size=0
},delete:function(key){
var state=getInternalState(this),entry=getEntry(this,key)
;if(entry){var next=entry.next,prev=entry.previous
;delete state.index[entry.index],
entry.removed=!0,prev&&(prev.next=next),next&&(next.previous=prev),
state.first==entry&&(state.first=next),
state.last==entry&&(state.last=prev),descriptors?state.size--:this.size--
}return!!entry},forEach:function(callbackfn){
for(var entry,state=getInternalState(this),boundFunction=functionBindContext(callbackfn,arguments.length>1?arguments[1]:void 0,3);entry=entry?entry.next:state.first;)for(boundFunction(entry.value,entry.key,this);entry&&entry.removed;)entry=entry.previous
},has:function(key){return!!getEntry(this,key)}
}),redefineAll(C.prototype,IS_MAP?{
get:function(key){var entry=getEntry(this,key)
;return entry&&entry.value},
set:function(key,value){
return define(this,0===key?0:key,value)}}:{
add:function(value){
return define(this,value=0===value?0:value,value)}
}),descriptors&&defineProperty$9(C.prototype,"size",{
get:function(){return getInternalState(this).size}
}),C},
setStrong:function(C,CONSTRUCTOR_NAME,IS_MAP){
var ITERATOR_NAME=CONSTRUCTOR_NAME+" Iterator",getInternalCollectionState=internalStateGetterFor(CONSTRUCTOR_NAME),getInternalIteratorState=internalStateGetterFor(ITERATOR_NAME)
;defineIterator(C,CONSTRUCTOR_NAME,(function(iterated,kind){
setInternalState$6(this,{type:ITERATOR_NAME,
target:iterated,
state:getInternalCollectionState(iterated),
kind:kind,last:void 0})}),(function(){
for(var state=getInternalIteratorState(this),kind=state.kind,entry=state.last;entry&&entry.removed;)entry=entry.previous
;return state.target&&(state.last=entry=entry?entry.next:state.state.first)?"keys"==kind?{
value:entry.key,done:!1}:"values"==kind?{
value:entry.value,done:!1}:{
value:[entry.key,entry.value],done:!1
}:(state.target=void 0,{value:void 0,done:!0})
}),IS_MAP?"entries":"values",!IS_MAP,!0),
setSpecies(CONSTRUCTOR_NAME)}
},es_map=collection("Map",(function(init){
return function(){
return init(this,arguments.length?arguments[0]:void 0)
}
}),collectionStrong),es_set=collection("Set",(function(init){
return function(){
return init(this,arguments.length?arguments[0]:void 0)
}
}),collectionStrong),getWeakData=internalMetadata.getWeakData,setInternalState$7=internalState.set,internalStateGetterFor$1=internalState.getterFor,find=arrayIteration.find,findIndex=arrayIteration.findIndex,id$1=0,uncaughtFrozenStore=function(store){
return store.frozen||(store.frozen=new UncaughtFrozenStore)
},UncaughtFrozenStore=function(){this.entries=[]
},findUncaughtFrozen=function(store,key){
return find(store.entries,(function(it){
return it[0]===key}))}
;UncaughtFrozenStore.prototype={get:function(key){
var entry=findUncaughtFrozen(this,key)
;if(entry)return entry[1]},has:function(key){
return!!findUncaughtFrozen(this,key)},
set:function(key,value){
var entry=findUncaughtFrozen(this,key)
;entry?entry[1]=value:this.entries.push([key,value])
},delete:function(key){
var index=findIndex(this.entries,(function(it){
return it[0]===key}))
;return~index&&this.entries.splice(index,1),!!~index
}};var collectionWeak={
getConstructor:function(wrapper,CONSTRUCTOR_NAME,IS_MAP,ADDER){
var C=wrapper((function(that,iterable){
anInstance(that,C,CONSTRUCTOR_NAME),setInternalState$7(that,{
type:CONSTRUCTOR_NAME,id:id$1++,frozen:void 0
}),null!=iterable&&iterate_1(iterable,that[ADDER],that,IS_MAP)
})),getInternalState=internalStateGetterFor$1(CONSTRUCTOR_NAME),define=function(that,key,value){
var state=getInternalState(that),data=getWeakData(anObject(key),!0)
;return!0===data?uncaughtFrozenStore(state).set(key,value):data[state.id]=value,
that};return redefineAll(C.prototype,{
delete:function(key){
var state=getInternalState(this)
;if(!isObject(key))return!1
;var data=getWeakData(key)
;return!0===data?uncaughtFrozenStore(state).delete(key):data&&has(data,state.id)&&delete data[state.id]
},has:function(key){
var state=getInternalState(this)
;if(!isObject(key))return!1
;var data=getWeakData(key)
;return!0===data?uncaughtFrozenStore(state).has(key):data&&has(data,state.id)
}}),redefineAll(C.prototype,IS_MAP?{
get:function(key){var state=getInternalState(this)
;if(isObject(key)){var data=getWeakData(key)
;return!0===data?uncaughtFrozenStore(state).get(key):data?data[state.id]:void 0
}},set:function(key,value){
return define(this,key,value)}}:{
add:function(value){return define(this,value,!0)}
}),C}
},es_weakMap=createCommonjsModule((function(module){
var InternalWeakMap,enforceIternalState=internalState.enforce,IS_IE11=!global_1.ActiveXObject&&"ActiveXObject"in global_1,isExtensible=Object.isExtensible,wrapper=function(init){
return function(){
return init(this,arguments.length?arguments[0]:void 0)
}
},$WeakMap=module.exports=collection("WeakMap",wrapper,collectionWeak)
;if(nativeWeakMap&&IS_IE11){
InternalWeakMap=collectionWeak.getConstructor(wrapper,"WeakMap",!0),
internalMetadata.REQUIRED=!0
;var WeakMapPrototype=$WeakMap.prototype,nativeDelete=WeakMapPrototype.delete,nativeHas=WeakMapPrototype.has,nativeGet=WeakMapPrototype.get,nativeSet=WeakMapPrototype.set
;redefineAll(WeakMapPrototype,{
delete:function(key){
if(isObject(key)&&!isExtensible(key)){
var state=enforceIternalState(this)
;return state.frozen||(state.frozen=new InternalWeakMap),
nativeDelete.call(this,key)||state.frozen.delete(key)
}return nativeDelete.call(this,key)},
has:function(key){
if(isObject(key)&&!isExtensible(key)){
var state=enforceIternalState(this)
;return state.frozen||(state.frozen=new InternalWeakMap),
nativeHas.call(this,key)||state.frozen.has(key)}
return nativeHas.call(this,key)},
get:function(key){
if(isObject(key)&&!isExtensible(key)){
var state=enforceIternalState(this)
;return state.frozen||(state.frozen=new InternalWeakMap),
nativeHas.call(this,key)?nativeGet.call(this,key):state.frozen.get(key)
}return nativeGet.call(this,key)},
set:function(key,value){
if(isObject(key)&&!isExtensible(key)){
var state=enforceIternalState(this)
;state.frozen||(state.frozen=new InternalWeakMap),
nativeHas.call(this,key)?nativeSet.call(this,key,value):state.frozen.set(key,value)
}else nativeSet.call(this,key,value);return this}
})}}));collection("WeakSet",(function(init){
return function(){
return init(this,arguments.length?arguments[0]:void 0)
}}),collectionWeak)
;var arrayBufferNative="undefined"!=typeof ArrayBuffer&&"undefined"!=typeof DataView,toIndex=function(it){
if(void 0===it)return 0
;var number=toInteger(it),length=toLength(number)
;if(number!==length)throw RangeError("Wrong length or index")
;return length
},abs$7=Math.abs,pow$3=Math.pow,floor$6=Math.floor,log$8=Math.log,LN2$2=Math.LN2,ieee754_pack=function(number,mantissaLength,bytes){
var exponent,mantissa,c,buffer=new Array(bytes),exponentLength=8*bytes-mantissaLength-1,eMax=(1<<exponentLength)-1,eBias=eMax>>1,rt=23===mantissaLength?pow$3(2,-24)-pow$3(2,-77):0,sign=number<0||0===number&&1/number<0?1:0,index=0
;for((number=abs$7(number))!=number||Infinity===number?(mantissa=number!=number?1:0,
exponent=eMax):(exponent=floor$6(log$8(number)/LN2$2),
number*(c=pow$3(2,-exponent))<1&&(exponent--,
c*=2),(number+=exponent+eBias>=1?rt/c:rt*pow$3(2,1-eBias))*c>=2&&(exponent++,
c/=2),
exponent+eBias>=eMax?(mantissa=0,exponent=eMax):exponent+eBias>=1?(mantissa=(number*c-1)*pow$3(2,mantissaLength),
exponent+=eBias):(mantissa=number*pow$3(2,eBias-1)*pow$3(2,mantissaLength),
exponent=0));mantissaLength>=8;buffer[index++]=255&mantissa,
mantissa/=256,mantissaLength-=8);
for(exponent=exponent<<mantissaLength|mantissa,
exponentLength+=mantissaLength;exponentLength>0;buffer[index++]=255&exponent,
exponent/=256,exponentLength-=8);
return buffer[--index]|=128*sign,buffer
},ieee754_unpack=function(buffer,mantissaLength){
var mantissa,bytes=buffer.length,exponentLength=8*bytes-mantissaLength-1,eMax=(1<<exponentLength)-1,eBias=eMax>>1,nBits=exponentLength-7,index=bytes-1,sign=buffer[index--],exponent=127&sign
;for(sign>>=7;nBits>0;exponent=256*exponent+buffer[index],
index--,nBits-=8);
for(mantissa=exponent&(1<<-nBits)-1,exponent>>=-nBits,nBits+=mantissaLength;nBits>0;mantissa=256*mantissa+buffer[index],
index--,nBits-=8);
if(0===exponent)exponent=1-eBias;else{
if(exponent===eMax)return mantissa?NaN:sign?-Infinity:Infinity
;mantissa+=pow$3(2,mantissaLength),exponent-=eBias
}
return(sign?-1:1)*mantissa*pow$3(2,exponent-mantissaLength)
},getOwnPropertyNames$2=objectGetOwnPropertyNames.f,defineProperty$a=objectDefineProperty.f,getInternalState$6=internalState.get,setInternalState$8=internalState.set,NativeArrayBuffer=global_1.ArrayBuffer,$ArrayBuffer=NativeArrayBuffer,$DataView=global_1.DataView,$DataViewPrototype=$DataView&&$DataView.prototype,ObjectPrototype$2=Object.prototype,RangeError$1=global_1.RangeError,packIEEE754=ieee754_pack,unpackIEEE754=ieee754_unpack,packInt8=function(number){
return[255&number]},packInt16=function(number){
return[255&number,number>>8&255]
},packInt32=function(number){
return[255&number,number>>8&255,number>>16&255,number>>24&255]
},unpackInt32=function(buffer){
return buffer[3]<<24|buffer[2]<<16|buffer[1]<<8|buffer[0]
},packFloat32=function(number){
return packIEEE754(number,23,4)
},packFloat64=function(number){
return packIEEE754(number,52,8)
},addGetter=function(Constructor,key){
defineProperty$a(Constructor.prototype,key,{
get:function(){
return getInternalState$6(this)[key]}})
},get$1=function(view,count,index,isLittleEndian){
var intIndex=toIndex(index),store=getInternalState$6(view)
;if(intIndex+count>store.byteLength)throw RangeError$1("Wrong index")
;var bytes=getInternalState$6(store.buffer).bytes,start=intIndex+store.byteOffset,pack=bytes.slice(start,start+count)
;return isLittleEndian?pack:pack.reverse()
},set$2=function(view,count,index,conversion,value,isLittleEndian){
var intIndex=toIndex(index),store=getInternalState$6(view)
;if(intIndex+count>store.byteLength)throw RangeError$1("Wrong index")
;for(var bytes=getInternalState$6(store.buffer).bytes,start=intIndex+store.byteOffset,pack=conversion(+value),i=0;i<count;i++)bytes[start+i]=pack[isLittleEndian?i:count-i-1]
};if(arrayBufferNative){if(!fails((function(){
NativeArrayBuffer(1)}))||!fails((function(){
new NativeArrayBuffer(-1)}))||fails((function(){
return new NativeArrayBuffer,new NativeArrayBuffer(1.5),
new NativeArrayBuffer(NaN),
"ArrayBuffer"!=NativeArrayBuffer.name}))){
for(var key$1,ArrayBufferPrototype=($ArrayBuffer=function(length){
return anInstance(this,$ArrayBuffer),
new NativeArrayBuffer(toIndex(length))
}).prototype=NativeArrayBuffer.prototype,keys$3=getOwnPropertyNames$2(NativeArrayBuffer),j$1=0;keys$3.length>j$1;)(key$1=keys$3[j$1++])in $ArrayBuffer||createNonEnumerableProperty($ArrayBuffer,key$1,NativeArrayBuffer[key$1])
;ArrayBufferPrototype.constructor=$ArrayBuffer}
objectSetPrototypeOf&&objectGetPrototypeOf($DataViewPrototype)!==ObjectPrototype$2&&objectSetPrototypeOf($DataViewPrototype,ObjectPrototype$2)
;var testView=new $DataView(new $ArrayBuffer(2)),nativeSetInt8=$DataViewPrototype.setInt8
;testView.setInt8(0,2147483648),
testView.setInt8(1,2147483649),!testView.getInt8(0)&&testView.getInt8(1)||redefineAll($DataViewPrototype,{
setInt8:function(byteOffset,value){
nativeSetInt8.call(this,byteOffset,value<<24>>24)
},setUint8:function(byteOffset,value){
nativeSetInt8.call(this,byteOffset,value<<24>>24)}
},{unsafe:!0})}else $ArrayBuffer=function(length){
anInstance(this,$ArrayBuffer,"ArrayBuffer")
;var byteLength=toIndex(length)
;setInternalState$8(this,{
bytes:arrayFill.call(new Array(byteLength),0),
byteLength:byteLength
}),descriptors||(this.byteLength=byteLength)
},$DataView=function(buffer,byteOffset,byteLength){
anInstance(this,$DataView,"DataView"),
anInstance(buffer,$ArrayBuffer,"DataView")
;var bufferLength=getInternalState$6(buffer).byteLength,offset=toInteger(byteOffset)
;if(offset<0||offset>bufferLength)throw RangeError$1("Wrong offset")
;if(offset+(byteLength=void 0===byteLength?bufferLength-offset:toLength(byteLength))>bufferLength)throw RangeError$1("Wrong length")
;setInternalState$8(this,{buffer:buffer,
byteLength:byteLength,byteOffset:offset
}),descriptors||(this.buffer=buffer,this.byteLength=byteLength,
this.byteOffset=offset)
},descriptors&&(addGetter($ArrayBuffer,"byteLength"),addGetter($DataView,"buffer"),
addGetter($DataView,"byteLength"),
addGetter($DataView,"byteOffset")),redefineAll($DataView.prototype,{
getInt8:function(byteOffset){
return get$1(this,1,byteOffset)[0]<<24>>24},
getUint8:function(byteOffset){
return get$1(this,1,byteOffset)[0]},
getInt16:function(byteOffset){
var bytes=get$1(this,2,byteOffset,arguments.length>1?arguments[1]:void 0)
;return(bytes[1]<<8|bytes[0])<<16>>16},
getUint16:function(byteOffset){
var bytes=get$1(this,2,byteOffset,arguments.length>1?arguments[1]:void 0)
;return bytes[1]<<8|bytes[0]},
getInt32:function(byteOffset){
return unpackInt32(get$1(this,4,byteOffset,arguments.length>1?arguments[1]:void 0))
},getUint32:function(byteOffset){
return unpackInt32(get$1(this,4,byteOffset,arguments.length>1?arguments[1]:void 0))>>>0
},getFloat32:function(byteOffset){
return unpackIEEE754(get$1(this,4,byteOffset,arguments.length>1?arguments[1]:void 0),23)
},getFloat64:function(byteOffset){
return unpackIEEE754(get$1(this,8,byteOffset,arguments.length>1?arguments[1]:void 0),52)
},setInt8:function(byteOffset,value){
set$2(this,1,byteOffset,packInt8,value)},
setUint8:function(byteOffset,value){
set$2(this,1,byteOffset,packInt8,value)},
setInt16:function(byteOffset,value){
set$2(this,2,byteOffset,packInt16,value,arguments.length>2?arguments[2]:void 0)
},setUint16:function(byteOffset,value){
set$2(this,2,byteOffset,packInt16,value,arguments.length>2?arguments[2]:void 0)
},setInt32:function(byteOffset,value){
set$2(this,4,byteOffset,packInt32,value,arguments.length>2?arguments[2]:void 0)
},setUint32:function(byteOffset,value){
set$2(this,4,byteOffset,packInt32,value,arguments.length>2?arguments[2]:void 0)
},setFloat32:function(byteOffset,value){
set$2(this,4,byteOffset,packFloat32,value,arguments.length>2?arguments[2]:void 0)
},setFloat64:function(byteOffset,value){
set$2(this,8,byteOffset,packFloat64,value,arguments.length>2?arguments[2]:void 0)
}})
;setToStringTag($ArrayBuffer,"ArrayBuffer"),setToStringTag($DataView,"DataView")
;var arrayBuffer={ArrayBuffer:$ArrayBuffer,
DataView:$DataView
},ArrayBuffer$1=arrayBuffer.ArrayBuffer,NativeArrayBuffer$1=global_1.ArrayBuffer
;_export({global:!0,
forced:NativeArrayBuffer$1!==ArrayBuffer$1},{
ArrayBuffer:ArrayBuffer$1
}),setSpecies("ArrayBuffer")
;var NAME$1,defineProperty$b=objectDefineProperty.f,Int8Array$1=global_1.Int8Array,Int8ArrayPrototype=Int8Array$1&&Int8Array$1.prototype,Uint8ClampedArray=global_1.Uint8ClampedArray,Uint8ClampedArrayPrototype=Uint8ClampedArray&&Uint8ClampedArray.prototype,TypedArray=Int8Array$1&&objectGetPrototypeOf(Int8Array$1),TypedArrayPrototype=Int8ArrayPrototype&&objectGetPrototypeOf(Int8ArrayPrototype),ObjectPrototype$3=Object.prototype,isPrototypeOf=ObjectPrototype$3.isPrototypeOf,TO_STRING_TAG$3=wellKnownSymbol("toStringTag"),TYPED_ARRAY_TAG=uid("TYPED_ARRAY_TAG"),NATIVE_ARRAY_BUFFER_VIEWS=arrayBufferNative&&!!objectSetPrototypeOf&&"Opera"!==classof(global_1.opera),TYPED_ARRAY_TAG_REQIRED=!1,TypedArrayConstructorsList={
Int8Array:1,Uint8Array:1,Uint8ClampedArray:1,
Int16Array:2,Uint16Array:2,Int32Array:4,
Uint32Array:4,Float32Array:4,Float64Array:8
},isTypedArray=function(it){
return isObject(it)&&has(TypedArrayConstructorsList,classof(it))
}
;for(NAME$1 in TypedArrayConstructorsList)global_1[NAME$1]||(NATIVE_ARRAY_BUFFER_VIEWS=!1)
;if((!NATIVE_ARRAY_BUFFER_VIEWS||"function"!=typeof TypedArray||TypedArray===Function.prototype)&&(TypedArray=function(){
throw TypeError("Incorrect invocation")
},NATIVE_ARRAY_BUFFER_VIEWS))for(NAME$1 in TypedArrayConstructorsList)global_1[NAME$1]&&objectSetPrototypeOf(global_1[NAME$1],TypedArray)
;if((!NATIVE_ARRAY_BUFFER_VIEWS||!TypedArrayPrototype||TypedArrayPrototype===ObjectPrototype$3)&&(TypedArrayPrototype=TypedArray.prototype,
NATIVE_ARRAY_BUFFER_VIEWS))for(NAME$1 in TypedArrayConstructorsList)global_1[NAME$1]&&objectSetPrototypeOf(global_1[NAME$1].prototype,TypedArrayPrototype)
;if(NATIVE_ARRAY_BUFFER_VIEWS&&objectGetPrototypeOf(Uint8ClampedArrayPrototype)!==TypedArrayPrototype&&objectSetPrototypeOf(Uint8ClampedArrayPrototype,TypedArrayPrototype),
descriptors&&!has(TypedArrayPrototype,TO_STRING_TAG$3))for(NAME$1 in TYPED_ARRAY_TAG_REQIRED=!0,
defineProperty$b(TypedArrayPrototype,TO_STRING_TAG$3,{
get:function(){
return isObject(this)?this[TYPED_ARRAY_TAG]:void 0
}
}),TypedArrayConstructorsList)global_1[NAME$1]&&createNonEnumerableProperty(global_1[NAME$1],TYPED_ARRAY_TAG,NAME$1)
;var arrayBufferViewCore={
NATIVE_ARRAY_BUFFER_VIEWS:NATIVE_ARRAY_BUFFER_VIEWS,
TYPED_ARRAY_TAG:TYPED_ARRAY_TAG_REQIRED&&TYPED_ARRAY_TAG,
aTypedArray:function(it){
if(isTypedArray(it))return it
;throw TypeError("Target is not a typed array")},
aTypedArrayConstructor:function(C){
if(objectSetPrototypeOf){
if(isPrototypeOf.call(TypedArray,C))return C
}else for(var ARRAY in TypedArrayConstructorsList)if(has(TypedArrayConstructorsList,NAME$1)){
var TypedArrayConstructor=global_1[ARRAY]
;if(TypedArrayConstructor&&(C===TypedArrayConstructor||isPrototypeOf.call(TypedArrayConstructor,C)))return C
}
throw TypeError("Target is not a typed array constructor")
},
exportTypedArrayMethod:function(KEY,property,forced){
if(descriptors){
if(forced)for(var ARRAY in TypedArrayConstructorsList){
var TypedArrayConstructor=global_1[ARRAY]
;TypedArrayConstructor&&has(TypedArrayConstructor.prototype,KEY)&&delete TypedArrayConstructor.prototype[KEY]
}
TypedArrayPrototype[KEY]&&!forced||redefine(TypedArrayPrototype,KEY,forced?property:NATIVE_ARRAY_BUFFER_VIEWS&&Int8ArrayPrototype[KEY]||property)
}},
exportTypedArrayStaticMethod:function(KEY,property,forced){
var ARRAY,TypedArrayConstructor;if(descriptors){
if(objectSetPrototypeOf){
if(forced)for(ARRAY in TypedArrayConstructorsList)(TypedArrayConstructor=global_1[ARRAY])&&has(TypedArrayConstructor,KEY)&&delete TypedArrayConstructor[KEY]
;if(TypedArray[KEY]&&!forced)return;try{
return redefine(TypedArray,KEY,forced?property:NATIVE_ARRAY_BUFFER_VIEWS&&Int8Array$1[KEY]||property)
}catch(error){}}
for(ARRAY in TypedArrayConstructorsList)!(TypedArrayConstructor=global_1[ARRAY])||TypedArrayConstructor[KEY]&&!forced||redefine(TypedArrayConstructor,KEY,property)
}},isView:function(it){var klass=classof(it)
;return"DataView"===klass||has(TypedArrayConstructorsList,klass)
},isTypedArray:isTypedArray,TypedArray:TypedArray,
TypedArrayPrototype:TypedArrayPrototype};_export({
target:"ArrayBuffer",stat:!0,
forced:!arrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS
},{isView:arrayBufferViewCore.isView})
;var ArrayBuffer$2=arrayBuffer.ArrayBuffer,DataView$1=arrayBuffer.DataView,nativeArrayBufferSlice=ArrayBuffer$2.prototype.slice,INCORRECT_SLICE=fails((function(){
return!new ArrayBuffer$2(2).slice(1,void 0).byteLength
}));_export({target:"ArrayBuffer",proto:!0,
unsafe:!0,forced:INCORRECT_SLICE},{
slice:function(start,end){
if(void 0!==nativeArrayBufferSlice&&void 0===end)return nativeArrayBufferSlice.call(anObject(this),start)
;for(var length=anObject(this).byteLength,first=toAbsoluteIndex(start,length),fin=toAbsoluteIndex(void 0===end?length:end,length),result=new(speciesConstructor(this,ArrayBuffer$2))(toLength(fin-first)),viewSource=new DataView$1(this),viewTarget=new DataView$1(result),index=0;first<fin;)viewTarget.setUint8(index++,viewSource.getUint8(first++))
;return result}}),_export({global:!0,
forced:!arrayBufferNative},{
DataView:arrayBuffer.DataView})
;var NATIVE_ARRAY_BUFFER_VIEWS$2=arrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS,ArrayBuffer$3=global_1.ArrayBuffer,Int8Array$2=global_1.Int8Array,typedArrayConstructorsRequireWrappers=!NATIVE_ARRAY_BUFFER_VIEWS$2||!fails((function(){
Int8Array$2(1)}))||!fails((function(){
new Int8Array$2(-1)
}))||!checkCorrectnessOfIteration((function(iterable){
new Int8Array$2,new Int8Array$2(null),
new Int8Array$2(1.5),new Int8Array$2(iterable)
}),!0)||fails((function(){
return 1!==new Int8Array$2(new ArrayBuffer$3(2),1,void 0).length
})),toPositiveInteger=function(it){
var result=toInteger(it)
;if(result<0)throw RangeError("The argument can't be less than 0")
;return result},toOffset=function(it,BYTES){
var offset=toPositiveInteger(it)
;if(offset%BYTES)throw RangeError("Wrong offset")
;return offset
},aTypedArrayConstructor$1=arrayBufferViewCore.aTypedArrayConstructor,typedArrayFrom=function(source){
var i,length,result,step,iterator,next,O=toObject(source),argumentsLength=arguments.length,mapfn=argumentsLength>1?arguments[1]:void 0,mapping=void 0!==mapfn,iteratorMethod=getIteratorMethod(O)
;if(null!=iteratorMethod&&!isArrayIteratorMethod(iteratorMethod))for(next=(iterator=iteratorMethod.call(O)).next,
O=[];!(step=next.call(iterator)).done;)O.push(step.value)
;for(mapping&&argumentsLength>2&&(mapfn=functionBindContext(mapfn,arguments[2],2)),
length=toLength(O.length),
result=new(aTypedArrayConstructor$1(this))(length),i=0;length>i;i++)result[i]=mapping?mapfn(O[i],i):O[i]
;return result
},typedArrayConstructor=createCommonjsModule((function(module){
var getOwnPropertyNames=objectGetOwnPropertyNames.f,forEach=arrayIteration.forEach,getInternalState=internalState.get,setInternalState=internalState.set,nativeDefineProperty=objectDefineProperty.f,nativeGetOwnPropertyDescriptor=objectGetOwnPropertyDescriptor.f,round=Math.round,RangeError=global_1.RangeError,ArrayBuffer=arrayBuffer.ArrayBuffer,DataView=arrayBuffer.DataView,NATIVE_ARRAY_BUFFER_VIEWS=arrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS,TYPED_ARRAY_TAG=arrayBufferViewCore.TYPED_ARRAY_TAG,TypedArray=arrayBufferViewCore.TypedArray,TypedArrayPrototype=arrayBufferViewCore.TypedArrayPrototype,aTypedArrayConstructor=arrayBufferViewCore.aTypedArrayConstructor,isTypedArray=arrayBufferViewCore.isTypedArray,fromList=function(C,list){
for(var index=0,length=list.length,result=new(aTypedArrayConstructor(C))(length);length>index;)result[index]=list[index++]
;return result},addGetter=function(it,key){
nativeDefineProperty(it,key,{get:function(){
return getInternalState(this)[key]}})
},isArrayBuffer=function(it){var klass
;return it instanceof ArrayBuffer||"ArrayBuffer"==(klass=classof(it))||"SharedArrayBuffer"==klass
},isTypedArrayIndex=function(target,key){
return isTypedArray(target)&&"symbol"!=typeof key&&key in target&&String(+key)==String(key)
},wrappedGetOwnPropertyDescriptor=function(target,key){
return isTypedArrayIndex(target,key=toPrimitive(key,!0))?createPropertyDescriptor(2,target[key]):nativeGetOwnPropertyDescriptor(target,key)
},wrappedDefineProperty=function(target,key,descriptor){
return!(isTypedArrayIndex(target,key=toPrimitive(key,!0))&&isObject(descriptor)&&has(descriptor,"value"))||has(descriptor,"get")||has(descriptor,"set")||descriptor.configurable||has(descriptor,"writable")&&!descriptor.writable||has(descriptor,"enumerable")&&!descriptor.enumerable?nativeDefineProperty(target,key,descriptor):(target[key]=descriptor.value,
target)}
;descriptors?(NATIVE_ARRAY_BUFFER_VIEWS||(objectGetOwnPropertyDescriptor.f=wrappedGetOwnPropertyDescriptor,
objectDefineProperty.f=wrappedDefineProperty,
addGetter(TypedArrayPrototype,"buffer"),
addGetter(TypedArrayPrototype,"byteOffset"),
addGetter(TypedArrayPrototype,"byteLength"),
addGetter(TypedArrayPrototype,"length")),_export({
target:"Object",stat:!0,
forced:!NATIVE_ARRAY_BUFFER_VIEWS},{
getOwnPropertyDescriptor:wrappedGetOwnPropertyDescriptor,
defineProperty:wrappedDefineProperty
}),module.exports=function(TYPE,wrapper,CLAMPED){
var BYTES=TYPE.match(/\d+$/)[0]/8,CONSTRUCTOR_NAME=TYPE+(CLAMPED?"Clamped":"")+"Array",GETTER="get"+TYPE,SETTER="set"+TYPE,NativeTypedArrayConstructor=global_1[CONSTRUCTOR_NAME],TypedArrayConstructor=NativeTypedArrayConstructor,TypedArrayConstructorPrototype=TypedArrayConstructor&&TypedArrayConstructor.prototype,exported={},addElement=function(that,index){
nativeDefineProperty(that,index,{get:function(){
return function(that,index){
var data=getInternalState(that)
;return data.view[GETTER](index*BYTES+data.byteOffset,!0)
}(this,index)},set:function(value){
return function(that,index,value){
var data=getInternalState(that)
;CLAMPED&&(value=(value=round(value))<0?0:value>255?255:255&value),
data.view[SETTER](index*BYTES+data.byteOffset,value,!0)
}(this,index,value)},enumerable:!0})}
;NATIVE_ARRAY_BUFFER_VIEWS?typedArrayConstructorsRequireWrappers&&(TypedArrayConstructor=wrapper((function(dummy,data,typedArrayOffset,$length){
return anInstance(dummy,TypedArrayConstructor,CONSTRUCTOR_NAME),
inheritIfRequired(isObject(data)?isArrayBuffer(data)?void 0!==$length?new NativeTypedArrayConstructor(data,toOffset(typedArrayOffset,BYTES),$length):void 0!==typedArrayOffset?new NativeTypedArrayConstructor(data,toOffset(typedArrayOffset,BYTES)):new NativeTypedArrayConstructor(data):isTypedArray(data)?fromList(TypedArrayConstructor,data):typedArrayFrom.call(TypedArrayConstructor,data):new NativeTypedArrayConstructor(toIndex(data)),dummy,TypedArrayConstructor)
})),
objectSetPrototypeOf&&objectSetPrototypeOf(TypedArrayConstructor,TypedArray),
forEach(getOwnPropertyNames(NativeTypedArrayConstructor),(function(key){
key in TypedArrayConstructor||createNonEnumerableProperty(TypedArrayConstructor,key,NativeTypedArrayConstructor[key])
})),
TypedArrayConstructor.prototype=TypedArrayConstructorPrototype):(TypedArrayConstructor=wrapper((function(that,data,offset,$length){
anInstance(that,TypedArrayConstructor,CONSTRUCTOR_NAME)
;var buffer,byteLength,length,index=0,byteOffset=0
;if(isObject(data)){
if(!isArrayBuffer(data))return isTypedArray(data)?fromList(TypedArrayConstructor,data):typedArrayFrom.call(TypedArrayConstructor,data)
;buffer=data,byteOffset=toOffset(offset,BYTES)
;var $len=data.byteLength;if(void 0===$length){
if($len%BYTES)throw RangeError("Wrong length")
;if((byteLength=$len-byteOffset)<0)throw RangeError("Wrong length")
}else if((byteLength=toLength($length)*BYTES)+byteOffset>$len)throw RangeError("Wrong length")
;length=byteLength/BYTES
}else length=toIndex(data),buffer=new ArrayBuffer(byteLength=length*BYTES)
;for(setInternalState(that,{buffer:buffer,
byteOffset:byteOffset,byteLength:byteLength,
length:length,view:new DataView(buffer)
});index<length;)addElement(that,index++)
})),objectSetPrototypeOf&&objectSetPrototypeOf(TypedArrayConstructor,TypedArray),
TypedArrayConstructorPrototype=TypedArrayConstructor.prototype=objectCreate(TypedArrayPrototype)),
TypedArrayConstructorPrototype.constructor!==TypedArrayConstructor&&createNonEnumerableProperty(TypedArrayConstructorPrototype,"constructor",TypedArrayConstructor),
TYPED_ARRAY_TAG&&createNonEnumerableProperty(TypedArrayConstructorPrototype,TYPED_ARRAY_TAG,CONSTRUCTOR_NAME),
exported[CONSTRUCTOR_NAME]=TypedArrayConstructor,
_export({global:!0,
forced:TypedArrayConstructor!=NativeTypedArrayConstructor,
sham:!NATIVE_ARRAY_BUFFER_VIEWS
},exported),"BYTES_PER_ELEMENT"in TypedArrayConstructor||createNonEnumerableProperty(TypedArrayConstructor,"BYTES_PER_ELEMENT",BYTES),
"BYTES_PER_ELEMENT"in TypedArrayConstructorPrototype||createNonEnumerableProperty(TypedArrayConstructorPrototype,"BYTES_PER_ELEMENT",BYTES),
setSpecies(CONSTRUCTOR_NAME)
}):module.exports=function(){}}))
;typedArrayConstructor("Int8",(function(init){
return function(data,byteOffset,length){
return init(this,data,byteOffset,length)}
})),typedArrayConstructor("Uint8",(function(init){
return function(data,byteOffset,length){
return init(this,data,byteOffset,length)}
})),typedArrayConstructor("Uint8",(function(init){
return function(data,byteOffset,length){
return init(this,data,byteOffset,length)}
}),!0),typedArrayConstructor("Int16",(function(init){
return function(data,byteOffset,length){
return init(this,data,byteOffset,length)}
})),typedArrayConstructor("Uint16",(function(init){
return function(data,byteOffset,length){
return init(this,data,byteOffset,length)}
})),typedArrayConstructor("Int32",(function(init){
return function(data,byteOffset,length){
return init(this,data,byteOffset,length)}
})),typedArrayConstructor("Uint32",(function(init){
return function(data,byteOffset,length){
return init(this,data,byteOffset,length)}
})),typedArrayConstructor("Float32",(function(init){
return function(data,byteOffset,length){
return init(this,data,byteOffset,length)}
})),typedArrayConstructor("Float64",(function(init){
return function(data,byteOffset,length){
return init(this,data,byteOffset,length)}
})),(0,arrayBufferViewCore.exportTypedArrayStaticMethod)("from",typedArrayFrom,typedArrayConstructorsRequireWrappers)
;var aTypedArrayConstructor$2=arrayBufferViewCore.aTypedArrayConstructor
;(0,arrayBufferViewCore.exportTypedArrayStaticMethod)("of",(function(){
for(var index=0,length=arguments.length,result=new(aTypedArrayConstructor$2(this))(length);length>index;)result[index]=arguments[index++]
;return result
}),typedArrayConstructorsRequireWrappers)
;var aTypedArray$1=arrayBufferViewCore.aTypedArray
;(0,arrayBufferViewCore.exportTypedArrayMethod)("copyWithin",(function(target,start){
return arrayCopyWithin.call(aTypedArray$1(this),target,start,arguments.length>2?arguments[2]:void 0)
}))
;var $every$1=arrayIteration.every,aTypedArray$2=arrayBufferViewCore.aTypedArray
;(0,
arrayBufferViewCore.exportTypedArrayMethod)("every",(function(callbackfn){
return $every$1(aTypedArray$2(this),callbackfn,arguments.length>1?arguments[1]:void 0)
}))
;var aTypedArray$3=arrayBufferViewCore.aTypedArray
;(0,arrayBufferViewCore.exportTypedArrayMethod)("fill",(function(value){
return arrayFill.apply(aTypedArray$3(this),arguments)
}))
;var $filter$1=arrayIteration.filter,aTypedArray$4=arrayBufferViewCore.aTypedArray,aTypedArrayConstructor$3=arrayBufferViewCore.aTypedArrayConstructor
;(0,
arrayBufferViewCore.exportTypedArrayMethod)("filter",(function(callbackfn){
for(var list=$filter$1(aTypedArray$4(this),callbackfn,arguments.length>1?arguments[1]:void 0),C=speciesConstructor(this,this.constructor),index=0,length=list.length,result=new(aTypedArrayConstructor$3(C))(length);length>index;)result[index]=list[index++]
;return result}))
;var $find$1=arrayIteration.find,aTypedArray$5=arrayBufferViewCore.aTypedArray
;(0,
arrayBufferViewCore.exportTypedArrayMethod)("find",(function(predicate){
return $find$1(aTypedArray$5(this),predicate,arguments.length>1?arguments[1]:void 0)
}))
;var $findIndex$1=arrayIteration.findIndex,aTypedArray$6=arrayBufferViewCore.aTypedArray
;(0,
arrayBufferViewCore.exportTypedArrayMethod)("findIndex",(function(predicate){
return $findIndex$1(aTypedArray$6(this),predicate,arguments.length>1?arguments[1]:void 0)
}))
;var $forEach$2=arrayIteration.forEach,aTypedArray$7=arrayBufferViewCore.aTypedArray
;(0,
arrayBufferViewCore.exportTypedArrayMethod)("forEach",(function(callbackfn){
$forEach$2(aTypedArray$7(this),callbackfn,arguments.length>1?arguments[1]:void 0)
}))
;var $includes$1=arrayIncludes.includes,aTypedArray$8=arrayBufferViewCore.aTypedArray
;(0,
arrayBufferViewCore.exportTypedArrayMethod)("includes",(function(searchElement){
return $includes$1(aTypedArray$8(this),searchElement,arguments.length>1?arguments[1]:void 0)
}))
;var $indexOf$1=arrayIncludes.indexOf,aTypedArray$9=arrayBufferViewCore.aTypedArray
;(0,
arrayBufferViewCore.exportTypedArrayMethod)("indexOf",(function(searchElement){
return $indexOf$1(aTypedArray$9(this),searchElement,arguments.length>1?arguments[1]:void 0)
}))
;var ITERATOR$5=wellKnownSymbol("iterator"),Uint8Array$1=global_1.Uint8Array,arrayValues=es_array_iterator.values,arrayKeys=es_array_iterator.keys,arrayEntries=es_array_iterator.entries,aTypedArray$a=arrayBufferViewCore.aTypedArray,exportTypedArrayMethod$a=arrayBufferViewCore.exportTypedArrayMethod,nativeTypedArrayIterator=Uint8Array$1&&Uint8Array$1.prototype[ITERATOR$5],CORRECT_ITER_NAME=!!nativeTypedArrayIterator&&("values"==nativeTypedArrayIterator.name||null==nativeTypedArrayIterator.name),typedArrayValues=function(){
return arrayValues.call(aTypedArray$a(this))}
;exportTypedArrayMethod$a("entries",(function(){
return arrayEntries.call(aTypedArray$a(this))
})),exportTypedArrayMethod$a("keys",(function(){
return arrayKeys.call(aTypedArray$a(this))
})),exportTypedArrayMethod$a("values",typedArrayValues,!CORRECT_ITER_NAME),
exportTypedArrayMethod$a(ITERATOR$5,typedArrayValues,!CORRECT_ITER_NAME)
;var aTypedArray$b=arrayBufferViewCore.aTypedArray,$join=[].join
;(0,arrayBufferViewCore.exportTypedArrayMethod)("join",(function(separator){
return $join.apply(aTypedArray$b(this),arguments)
}))
;var aTypedArray$c=arrayBufferViewCore.aTypedArray
;(0,arrayBufferViewCore.exportTypedArrayMethod)("lastIndexOf",(function(searchElement){
return arrayLastIndexOf.apply(aTypedArray$c(this),arguments)
}))
;var $map$1=arrayIteration.map,aTypedArray$d=arrayBufferViewCore.aTypedArray,aTypedArrayConstructor$4=arrayBufferViewCore.aTypedArrayConstructor
;(0,
arrayBufferViewCore.exportTypedArrayMethod)("map",(function(mapfn){
return $map$1(aTypedArray$d(this),mapfn,arguments.length>1?arguments[1]:void 0,(function(O,length){
return new(aTypedArrayConstructor$4(speciesConstructor(O,O.constructor)))(length)
}))}))
;var $reduce$1=arrayReduce.left,aTypedArray$e=arrayBufferViewCore.aTypedArray
;(0,
arrayBufferViewCore.exportTypedArrayMethod)("reduce",(function(callbackfn){
return $reduce$1(aTypedArray$e(this),callbackfn,arguments.length,arguments.length>1?arguments[1]:void 0)
}))
;var $reduceRight$1=arrayReduce.right,aTypedArray$f=arrayBufferViewCore.aTypedArray
;(0,
arrayBufferViewCore.exportTypedArrayMethod)("reduceRight",(function(callbackfn){
return $reduceRight$1(aTypedArray$f(this),callbackfn,arguments.length,arguments.length>1?arguments[1]:void 0)
}))
;var aTypedArray$g=arrayBufferViewCore.aTypedArray,exportTypedArrayMethod$g=arrayBufferViewCore.exportTypedArrayMethod,floor$7=Math.floor
;exportTypedArrayMethod$g("reverse",(function(){
for(var value,length=aTypedArray$g(this).length,middle=floor$7(length/2),index=0;index<middle;)value=this[index],
this[index++]=this[--length],this[length]=value
;return this}))
;var aTypedArray$h=arrayBufferViewCore.aTypedArray
;(0,arrayBufferViewCore.exportTypedArrayMethod)("set",(function(arrayLike){
aTypedArray$h(this)
;var offset=toOffset(arguments.length>1?arguments[1]:void 0,1),length=this.length,src=toObject(arrayLike),len=toLength(src.length),index=0
;if(len+offset>length)throw RangeError("Wrong length")
;for(;index<len;)this[offset+index]=src[index++]
}),fails((function(){new Int8Array(1).set({})})))
;var aTypedArray$i=arrayBufferViewCore.aTypedArray,aTypedArrayConstructor$5=arrayBufferViewCore.aTypedArrayConstructor,$slice=[].slice
;(0,
arrayBufferViewCore.exportTypedArrayMethod)("slice",(function(start,end){
for(var list=$slice.call(aTypedArray$i(this),start,end),C=speciesConstructor(this,this.constructor),index=0,length=list.length,result=new(aTypedArrayConstructor$5(C))(length);length>index;)result[index]=list[index++]
;return result}),fails((function(){
new Int8Array(1).slice()})))
;var $some$1=arrayIteration.some,aTypedArray$j=arrayBufferViewCore.aTypedArray
;(0,
arrayBufferViewCore.exportTypedArrayMethod)("some",(function(callbackfn){
return $some$1(aTypedArray$j(this),callbackfn,arguments.length>1?arguments[1]:void 0)
}))
;var aTypedArray$k=arrayBufferViewCore.aTypedArray,$sort=[].sort
;(0,arrayBufferViewCore.exportTypedArrayMethod)("sort",(function(comparefn){
return $sort.call(aTypedArray$k(this),comparefn)
}))
;var aTypedArray$l=arrayBufferViewCore.aTypedArray
;(0,arrayBufferViewCore.exportTypedArrayMethod)("subarray",(function(begin,end){
var O=aTypedArray$l(this),length=O.length,beginIndex=toAbsoluteIndex(begin,length)
;return new(speciesConstructor(O,O.constructor))(O.buffer,O.byteOffset+beginIndex*O.BYTES_PER_ELEMENT,toLength((void 0===end?length:toAbsoluteIndex(end,length))-beginIndex))
}))
;var Int8Array$3=global_1.Int8Array,aTypedArray$m=arrayBufferViewCore.aTypedArray,exportTypedArrayMethod$m=arrayBufferViewCore.exportTypedArrayMethod,$toLocaleString=[].toLocaleString,$slice$1=[].slice,TO_LOCALE_STRING_BUG=!!Int8Array$3&&fails((function(){
$toLocaleString.call(new Int8Array$3(1))}))
;exportTypedArrayMethod$m("toLocaleString",(function(){
return $toLocaleString.apply(TO_LOCALE_STRING_BUG?$slice$1.call(aTypedArray$m(this)):aTypedArray$m(this),arguments)
}),fails((function(){
return[1,2].toLocaleString()!=new Int8Array$3([1,2]).toLocaleString()
}))||!fails((function(){
Int8Array$3.prototype.toLocaleString.call([1,2])
})))
;var exportTypedArrayMethod$n=arrayBufferViewCore.exportTypedArrayMethod,Uint8Array$2=global_1.Uint8Array,Uint8ArrayPrototype=Uint8Array$2&&Uint8Array$2.prototype||{},arrayToString=[].toString,arrayJoin=[].join
;fails((function(){arrayToString.call({})
}))&&(arrayToString=function(){
return arrayJoin.call(this)})
;var IS_NOT_ARRAY_METHOD=Uint8ArrayPrototype.toString!=arrayToString
;exportTypedArrayMethod$n("toString",arrayToString,IS_NOT_ARRAY_METHOD)
;var nativeApply=getBuiltIn("Reflect","apply"),functionApply=Function.apply,OPTIONAL_ARGUMENTS_LIST=!fails((function(){
nativeApply((function(){}))}));_export({
target:"Reflect",stat:!0,
forced:OPTIONAL_ARGUMENTS_LIST},{
apply:function(target,thisArgument,argumentsList){
return aFunction$1(target),anObject(argumentsList),
nativeApply?nativeApply(target,thisArgument,argumentsList):functionApply.call(target,thisArgument,argumentsList)
}})
;var nativeConstruct=getBuiltIn("Reflect","construct"),NEW_TARGET_BUG=fails((function(){
function F(){}
return!(nativeConstruct((function(){}),[],F)instanceof F)
})),ARGS_BUG=!fails((function(){
nativeConstruct((function(){}))
})),FORCED$k=NEW_TARGET_BUG||ARGS_BUG;_export({
target:"Reflect",stat:!0,forced:FORCED$k,
sham:FORCED$k},{construct:function(Target,args){
aFunction$1(Target),anObject(args)
;var newTarget=arguments.length<3?Target:aFunction$1(arguments[2])
;if(ARGS_BUG&&!NEW_TARGET_BUG)return nativeConstruct(Target,args,newTarget)
;if(Target==newTarget){switch(args.length){case 0:
return new Target;case 1:
return new Target(args[0]);case 2:
return new Target(args[0],args[1]);case 3:
return new Target(args[0],args[1],args[2]);case 4:
return new Target(args[0],args[1],args[2],args[3])
}var $args=[null]
;return $args.push.apply($args,args),new(functionBind.apply(Target,$args))
}
var proto=newTarget.prototype,instance=objectCreate(isObject(proto)?proto:Object.prototype),result=Function.apply.call(Target,instance,args)
;return isObject(result)?result:instance}})
;var ERROR_INSTEAD_OF_FALSE=fails((function(){
Reflect.defineProperty(objectDefineProperty.f({},1,{
value:1}),1,{value:2})}));_export({
target:"Reflect",stat:!0,
forced:ERROR_INSTEAD_OF_FALSE,sham:!descriptors},{
defineProperty:function(target,propertyKey,attributes){
anObject(target)
;var key=toPrimitive(propertyKey,!0)
;anObject(attributes);try{
return objectDefineProperty.f(target,key,attributes),!0
}catch(error){return!1}}})
;var getOwnPropertyDescriptor$8=objectGetOwnPropertyDescriptor.f
;_export({target:"Reflect",stat:!0},{
deleteProperty:function(target,propertyKey){
var descriptor=getOwnPropertyDescriptor$8(anObject(target),propertyKey)
;return!(descriptor&&!descriptor.configurable)&&delete target[propertyKey]
}}),_export({target:"Reflect",stat:!0},{
get:function get$2(target,propertyKey){
var descriptor,prototype,receiver=arguments.length<3?target:arguments[2]
;return anObject(target)===receiver?target[propertyKey]:(descriptor=objectGetOwnPropertyDescriptor.f(target,propertyKey))?has(descriptor,"value")?descriptor.value:void 0===descriptor.get?void 0:descriptor.get.call(receiver):isObject(prototype=objectGetPrototypeOf(target))?get$2(prototype,propertyKey,receiver):void 0
}}),_export({target:"Reflect",stat:!0,
sham:!descriptors},{
getOwnPropertyDescriptor:function(target,propertyKey){
return objectGetOwnPropertyDescriptor.f(anObject(target),propertyKey)
}}),_export({target:"Reflect",stat:!0,
sham:!correctPrototypeGetter},{
getPrototypeOf:function(target){
return objectGetPrototypeOf(anObject(target))}
}),_export({target:"Reflect",stat:!0},{
has:function(target,propertyKey){
return propertyKey in target}})
;var objectIsExtensible=Object.isExtensible
;_export({target:"Reflect",stat:!0},{
isExtensible:function(target){
return anObject(target),!objectIsExtensible||objectIsExtensible(target)
}}),_export({target:"Reflect",stat:!0},{
ownKeys:ownKeys}),_export({target:"Reflect",
stat:!0,sham:!freezing},{
preventExtensions:function(target){
anObject(target);try{
var objectPreventExtensions=getBuiltIn("Object","preventExtensions")
;return objectPreventExtensions&&objectPreventExtensions(target),
!0}catch(error){return!1}}})
;var MS_EDGE_BUG=fails((function(){
var object=objectDefineProperty.f({},"a",{
configurable:!0})
;return!1!==Reflect.set(objectGetPrototypeOf(object),"a",1,object)
}));_export({target:"Reflect",stat:!0,
forced:MS_EDGE_BUG},{
set:function set$3(target,propertyKey,V){
var existingDescriptor,prototype,receiver=arguments.length<4?target:arguments[3],ownDescriptor=objectGetOwnPropertyDescriptor.f(anObject(target),propertyKey)
;if(!ownDescriptor){
if(isObject(prototype=objectGetPrototypeOf(target)))return set$3(prototype,propertyKey,V,receiver)
;ownDescriptor=createPropertyDescriptor(0)}
if(has(ownDescriptor,"value")){
if(!1===ownDescriptor.writable||!isObject(receiver))return!1
;if(existingDescriptor=objectGetOwnPropertyDescriptor.f(receiver,propertyKey)){
if(existingDescriptor.get||existingDescriptor.set||!1===existingDescriptor.writable)return!1
;existingDescriptor.value=V,
objectDefineProperty.f(receiver,propertyKey,existingDescriptor)
}else objectDefineProperty.f(receiver,propertyKey,createPropertyDescriptor(0,V))
;return!0}
return void 0!==ownDescriptor.set&&(ownDescriptor.set.call(receiver,V),
!0)}}),objectSetPrototypeOf&&_export({
target:"Reflect",stat:!0},{
setPrototypeOf:function(target,proto){
anObject(target),aPossiblePrototype(proto);try{
return objectSetPrototypeOf(target,proto),!0
}catch(error){return!1}}})
;var metadata=shared("metadata"),store$2=metadata.store||(metadata.store=new es_weakMap),getOrCreateMetadataMap=function(target,targetKey,create){
var targetMetadata=store$2.get(target)
;if(!targetMetadata){if(!create)return
;store$2.set(target,targetMetadata=new es_map)}
var keyMetadata=targetMetadata.get(targetKey)
;if(!keyMetadata){if(!create)return
;targetMetadata.set(targetKey,keyMetadata=new es_map)
}return keyMetadata},reflectMetadata={
store:store$2,getMap:getOrCreateMetadataMap,
has:function(MetadataKey,O,P){
var metadataMap=getOrCreateMetadataMap(O,P,!1)
;return void 0!==metadataMap&&metadataMap.has(MetadataKey)
},get:function(MetadataKey,O,P){
var metadataMap=getOrCreateMetadataMap(O,P,!1)
;return void 0===metadataMap?void 0:metadataMap.get(MetadataKey)
},set:function(MetadataKey,MetadataValue,O,P){
getOrCreateMetadataMap(O,P,!0).set(MetadataKey,MetadataValue)
},keys:function(target,targetKey){
var metadataMap=getOrCreateMetadataMap(target,targetKey,!1),keys=[]
;return metadataMap&&metadataMap.forEach((function(_,key){
keys.push(key)})),keys},toKey:function(it){
return void 0===it||"symbol"==typeof it?it:String(it)
}
},toMetadataKey$1=reflectMetadata.toKey,ordinaryDefineOwnMetadata$1=reflectMetadata.set
;_export({target:"Reflect",stat:!0},{
defineMetadata:function(metadataKey,metadataValue,target){
var targetKey=arguments.length<4?void 0:toMetadataKey$1(arguments[3])
;ordinaryDefineOwnMetadata$1(metadataKey,metadataValue,anObject(target),targetKey)
}})
;var toMetadataKey$2=reflectMetadata.toKey,getOrCreateMetadataMap$1=reflectMetadata.getMap,store$3=reflectMetadata.store
;_export({target:"Reflect",stat:!0},{
deleteMetadata:function(metadataKey,target){
var targetKey=arguments.length<3?void 0:toMetadataKey$2(arguments[2]),metadataMap=getOrCreateMetadataMap$1(anObject(target),targetKey,!1)
;if(void 0===metadataMap||!metadataMap.delete(metadataKey))return!1
;if(metadataMap.size)return!0
;var targetMetadata=store$3.get(target)
;return targetMetadata.delete(targetKey),
!!targetMetadata.size||store$3.delete(target)}})
;var ordinaryHasOwnMetadata$1=reflectMetadata.has,ordinaryGetOwnMetadata$1=reflectMetadata.get,toMetadataKey$3=reflectMetadata.toKey,ordinaryGetMetadata=function(MetadataKey,O,P){
if(ordinaryHasOwnMetadata$1(MetadataKey,O,P))return ordinaryGetOwnMetadata$1(MetadataKey,O,P)
;var parent=objectGetPrototypeOf(O)
;return null!==parent?ordinaryGetMetadata(MetadataKey,parent,P):void 0
};_export({target:"Reflect",stat:!0},{
getMetadata:function(metadataKey,target){
var targetKey=arguments.length<3?void 0:toMetadataKey$3(arguments[2])
;return ordinaryGetMetadata(metadataKey,anObject(target),targetKey)
}})
;var ordinaryOwnMetadataKeys$1=reflectMetadata.keys,toMetadataKey$4=reflectMetadata.toKey,ordinaryMetadataKeys=function(O,P){
var oKeys=ordinaryOwnMetadataKeys$1(O,P),parent=objectGetPrototypeOf(O)
;if(null===parent)return oKeys
;var iter,result,pKeys=ordinaryMetadataKeys(parent,P)
;return pKeys.length?oKeys.length?(iter=new es_set(oKeys.concat(pKeys)),
iterate_1(iter,(result=[]).push,result),
result):pKeys:oKeys};_export({target:"Reflect",
stat:!0},{getMetadataKeys:function(target){
var targetKey=arguments.length<2?void 0:toMetadataKey$4(arguments[1])
;return ordinaryMetadataKeys(anObject(target),targetKey)
}})
;var ordinaryGetOwnMetadata$2=reflectMetadata.get,toMetadataKey$5=reflectMetadata.toKey
;_export({target:"Reflect",stat:!0},{
getOwnMetadata:function(metadataKey,target){
var targetKey=arguments.length<3?void 0:toMetadataKey$5(arguments[2])
;return ordinaryGetOwnMetadata$2(metadataKey,anObject(target),targetKey)
}})
;var ordinaryOwnMetadataKeys$2=reflectMetadata.keys,toMetadataKey$6=reflectMetadata.toKey
;_export({target:"Reflect",stat:!0},{
getOwnMetadataKeys:function(target){
var targetKey=arguments.length<2?void 0:toMetadataKey$6(arguments[1])
;return ordinaryOwnMetadataKeys$2(anObject(target),targetKey)
}})
;var ordinaryHasOwnMetadata$2=reflectMetadata.has,toMetadataKey$7=reflectMetadata.toKey,ordinaryHasMetadata=function(MetadataKey,O,P){
if(ordinaryHasOwnMetadata$2(MetadataKey,O,P))return!0
;var parent=objectGetPrototypeOf(O)
;return null!==parent&&ordinaryHasMetadata(MetadataKey,parent,P)
};_export({target:"Reflect",stat:!0},{
hasMetadata:function(metadataKey,target){
var targetKey=arguments.length<3?void 0:toMetadataKey$7(arguments[2])
;return ordinaryHasMetadata(metadataKey,anObject(target),targetKey)
}})
;var ordinaryHasOwnMetadata$3=reflectMetadata.has,toMetadataKey$8=reflectMetadata.toKey
;_export({target:"Reflect",stat:!0},{
hasOwnMetadata:function(metadataKey,target){
var targetKey=arguments.length<3?void 0:toMetadataKey$8(arguments[2])
;return ordinaryHasOwnMetadata$3(metadataKey,anObject(target),targetKey)
}})
;var toMetadataKey$9=reflectMetadata.toKey,ordinaryDefineOwnMetadata$2=reflectMetadata.set
;_export({target:"Reflect",stat:!0},{
metadata:function(metadataKey,metadataValue){
return function(target,key){
ordinaryDefineOwnMetadata$2(metadataKey,metadataValue,anObject(target),toMetadataKey$9(key))
}}}),_export({target:"Math",stat:!0},{
iaddh:function(x0,x1,y0,y1){
var $x0=x0>>>0,$y0=y0>>>0
;return(x1>>>0)+(y1>>>0)+(($x0&$y0|($x0|$y0)&~($x0+$y0>>>0))>>>31)|0
}}),_export({target:"Math",stat:!0},{
isubh:function(x0,x1,y0,y1){
var $x0=x0>>>0,$y0=y0>>>0
;return(x1>>>0)-(y1>>>0)-((~$x0&$y0|~($x0^$y0)&$x0-$y0>>>0)>>>31)|0
}}),_export({target:"Math",stat:!0},{
imulh:function(u,v){
var $u=+u,$v=+v,u0=65535&$u,v0=65535&$v,u1=$u>>16,v1=$v>>16,t=(u1*v0>>>0)+(u0*v0>>>16)
;return u1*v1+(t>>16)+((u0*v1>>>0)+(65535&t)>>16)}
}),_export({target:"Math",stat:!0},{
umulh:function(u,v){
var $u=+u,$v=+v,u0=65535&$u,v0=65535&$v,u1=$u>>>16,v1=$v>>>16,t=(u1*v0>>>0)+(u0*v0>>>16)
;return u1*v1+(t>>>16)+((u0*v1>>>0)+(65535&t)>>>16)
}});var charAt$2=stringMultibyte.charAt;_export({
target:"String",proto:!0},{at:function(pos){
return charAt$2(this,pos)}})
;var ITERATOR$6=wellKnownSymbol("iterator"),nativeUrl=!fails((function(){
var url=new URL("b?a=1&b=2&c=3","http://a"),searchParams=url.searchParams,result=""
;return url.pathname="c%20d",
searchParams.forEach((function(value,key){
searchParams.delete("b"),result+=key+value
})),!searchParams.sort||"http://a/c%20d?a=1&c=3"!==url.href||"3"!==searchParams.get("c")||"a=1"!==String(new URLSearchParams("?a=1"))||!searchParams[ITERATOR$6]||"a"!==new URL("https://a@b").username||"b"!==new URLSearchParams(new URLSearchParams("a=b")).get("a")||"xn--e1aybc"!==new URL("http://тест").host||"#%D0%B1"!==new URL("http://a#б").hash||"a1c3"!==result||"x"!==new URL("http://x",void 0).host
})),regexNonASCII=/[^\0-\u007E]/,regexSeparators=/[.\u3002\uFF0E\uFF61]/g,OVERFLOW_ERROR="Overflow: input needs wider integers to process",floor$8=Math.floor,stringFromCharCode=String.fromCharCode,digitToBasic=function(digit){
return digit+22+75*(digit<26)
},adapt=function(delta,numPoints,firstTime){
var k=0
;for(delta=firstTime?floor$8(delta/700):delta>>1,delta+=floor$8(delta/numPoints);delta>455;k+=36)delta=floor$8(delta/35)
;return floor$8(k+36*delta/(delta+38))
},encode=function(input){
var i,currentValue,output=[],inputLength=(input=function(string){
for(var output=[],counter=0,length=string.length;counter<length;){
var value=string.charCodeAt(counter++)
;if(value>=55296&&value<=56319&&counter<length){
var extra=string.charCodeAt(counter++)
;56320==(64512&extra)?output.push(((1023&value)<<10)+(1023&extra)+65536):(output.push(value),
counter--)}else output.push(value)}return output
}(input)).length,n=128,delta=0,bias=72
;for(i=0;i<input.length;i++)(currentValue=input[i])<128&&output.push(stringFromCharCode(currentValue))
;var basicLength=output.length,handledCPCount=basicLength
;for(basicLength&&output.push("-");handledCPCount<inputLength;){
var m=2147483647
;for(i=0;i<input.length;i++)(currentValue=input[i])>=n&&currentValue<m&&(m=currentValue)
;var handledCPCountPlusOne=handledCPCount+1
;if(m-n>floor$8((2147483647-delta)/handledCPCountPlusOne))throw RangeError(OVERFLOW_ERROR)
;for(delta+=(m-n)*handledCPCountPlusOne,
n=m,i=0;i<input.length;i++){
if((currentValue=input[i])<n&&++delta>2147483647)throw RangeError(OVERFLOW_ERROR)
;if(currentValue==n){for(var q=delta,k=36;;k+=36){
var t=k<=bias?1:k>=bias+26?26:k-bias;if(q<t)break
;var qMinusT=q-t,baseMinusT=36-t
;output.push(stringFromCharCode(digitToBasic(t+qMinusT%baseMinusT))),
q=floor$8(qMinusT/baseMinusT)}
output.push(stringFromCharCode(digitToBasic(q))),bias=adapt(delta,handledCPCountPlusOne,handledCPCount==basicLength),
delta=0,++handledCPCount}}++delta,++n}
return output.join("")},getIterator=function(it){
var iteratorMethod=getIteratorMethod(it)
;if("function"!=typeof iteratorMethod)throw TypeError(String(it)+" is not iterable")
;return anObject(iteratorMethod.call(it))
},$fetch$1=getBuiltIn("fetch"),Headers=getBuiltIn("Headers"),ITERATOR$7=wellKnownSymbol("iterator"),setInternalState$9=internalState.set,getInternalParamsState=internalState.getterFor("URLSearchParams"),getInternalIteratorState=internalState.getterFor("URLSearchParamsIterator"),plus=/\+/g,sequences=Array(4),percentSequence=function(bytes){
return sequences[bytes-1]||(sequences[bytes-1]=RegExp("((?:%[\\da-f]{2}){"+bytes+"})","gi"))
},percentDecode=function(sequence){try{
return decodeURIComponent(sequence)}catch(error){
return sequence}},deserialize=function(it){
var result=it.replace(plus," "),bytes=4;try{
return decodeURIComponent(result)}catch(error){
for(;bytes;)result=result.replace(percentSequence(bytes--),percentDecode)
;return result}},find$1=/[!'()~]|%20/g,replace={
"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E",
"%20":"+"},replacer=function(match){
return replace[match]},serialize=function(it){
return encodeURIComponent(it).replace(find$1,replacer)
},parseSearchParams=function(result,query){
if(query)for(var attribute,entry,attributes=query.split("&"),index=0;index<attributes.length;)(attribute=attributes[index++]).length&&(entry=attribute.split("="),
result.push({key:deserialize(entry.shift()),
value:deserialize(entry.join("="))}))
},updateSearchParams=function(query){
this.entries.length=0,parseSearchParams(this.entries,query)
},validateArgumentsLength=function(passed,required){
if(passed<required)throw TypeError("Not enough arguments")
},URLSearchParamsIterator=createIteratorConstructor((function(params,kind){
setInternalState$9(this,{
type:"URLSearchParamsIterator",
iterator:getIterator(getInternalParamsState(params).entries),
kind:kind})}),"Iterator",(function(){
var state=getInternalIteratorState(this),kind=state.kind,step=state.iterator.next(),entry=step.value
;return step.done||(step.value="keys"===kind?entry.key:"values"===kind?entry.value:[entry.key,entry.value]),
step})),URLSearchParamsConstructor=function(){
anInstance(this,URLSearchParamsConstructor,"URLSearchParams")
;var iteratorMethod,iterator,next,step,entryIterator,entryNext,first,second,key,init=arguments.length>0?arguments[0]:void 0,that=this,entries=[]
;if(setInternalState$9(that,{
type:"URLSearchParams",entries:entries,
updateURL:function(){},
updateSearchParams:updateSearchParams
}),void 0!==init)if(isObject(init))if("function"==typeof(iteratorMethod=getIteratorMethod(init)))for(next=(iterator=iteratorMethod.call(init)).next;!(step=next.call(iterator)).done;){
if((first=(entryNext=(entryIterator=getIterator(anObject(step.value))).next).call(entryIterator)).done||(second=entryNext.call(entryIterator)).done||!entryNext.call(entryIterator).done)throw TypeError("Expected sequence with length 2")
;entries.push({key:first.value+"",
value:second.value+""})
}else for(key in init)has(init,key)&&entries.push({
key:key,value:init[key]+""
});else parseSearchParams(entries,"string"==typeof init?"?"===init.charAt(0)?init.slice(1):init:init+"")
},URLSearchParamsPrototype=URLSearchParamsConstructor.prototype
;redefineAll(URLSearchParamsPrototype,{
append:function(name,value){
validateArgumentsLength(arguments.length,2)
;var state=getInternalParamsState(this)
;state.entries.push({key:name+"",value:value+""
}),state.updateURL()},delete:function(name){
validateArgumentsLength(arguments.length,1)
;for(var state=getInternalParamsState(this),entries=state.entries,key=name+"",index=0;index<entries.length;)entries[index].key===key?entries.splice(index,1):index++
;state.updateURL()},get:function(name){
validateArgumentsLength(arguments.length,1)
;for(var entries=getInternalParamsState(this).entries,key=name+"",index=0;index<entries.length;index++)if(entries[index].key===key)return entries[index].value
;return null},getAll:function(name){
validateArgumentsLength(arguments.length,1)
;for(var entries=getInternalParamsState(this).entries,key=name+"",result=[],index=0;index<entries.length;index++)entries[index].key===key&&result.push(entries[index].value)
;return result},has:function(name){
validateArgumentsLength(arguments.length,1)
;for(var entries=getInternalParamsState(this).entries,key=name+"",index=0;index<entries.length;)if(entries[index++].key===key)return!0
;return!1},set:function(name,value){
validateArgumentsLength(arguments.length,1)
;for(var entry,state=getInternalParamsState(this),entries=state.entries,found=!1,key=name+"",val=value+"",index=0;index<entries.length;index++)(entry=entries[index]).key===key&&(found?entries.splice(index--,1):(found=!0,
entry.value=val));found||entries.push({key:key,
value:val}),state.updateURL()},sort:function(){
var entry,entriesIndex,sliceIndex,state=getInternalParamsState(this),entries=state.entries,slice=entries.slice()
;for(entries.length=0,
sliceIndex=0;sliceIndex<slice.length;sliceIndex++){
for(entry=slice[sliceIndex],entriesIndex=0;entriesIndex<sliceIndex;entriesIndex++)if(entries[entriesIndex].key>entry.key){
entries.splice(entriesIndex,0,entry);break}
entriesIndex===sliceIndex&&entries.push(entry)}
state.updateURL()},forEach:function(callback){
for(var entry,entries=getInternalParamsState(this).entries,boundFunction=functionBindContext(callback,arguments.length>1?arguments[1]:void 0,3),index=0;index<entries.length;)boundFunction((entry=entries[index++]).value,entry.key,this)
},keys:function(){
return new URLSearchParamsIterator(this,"keys")},
values:function(){
return new URLSearchParamsIterator(this,"values")
},entries:function(){
return new URLSearchParamsIterator(this,"entries")
}},{enumerable:!0
}),redefine(URLSearchParamsPrototype,ITERATOR$7,URLSearchParamsPrototype.entries),
redefine(URLSearchParamsPrototype,"toString",(function(){
for(var entry,entries=getInternalParamsState(this).entries,result=[],index=0;index<entries.length;)entry=entries[index++],
result.push(serialize(entry.key)+"="+serialize(entry.value))
;return result.join("&")}),{enumerable:!0
}),setToStringTag(URLSearchParamsConstructor,"URLSearchParams"),
_export({global:!0,forced:!nativeUrl},{
URLSearchParams:URLSearchParamsConstructor
}),nativeUrl||"function"!=typeof $fetch$1||"function"!=typeof Headers||_export({
global:!0,enumerable:!0,forced:!0},{
fetch:function(input){
var init,body,headers,args=[input]
;return arguments.length>1&&(isObject(init=arguments[1])&&(body=init.body,
"URLSearchParams"===classof(body)&&((headers=init.headers?new Headers(init.headers):new Headers).has("content-type")||headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"),
init=objectCreate(init,{
body:createPropertyDescriptor(0,String(body)),
headers:createPropertyDescriptor(0,headers)
}))),args.push(init)),$fetch$1.apply(this,args)}})
;var EOF,web_urlSearchParams={
URLSearchParams:URLSearchParamsConstructor,
getState:getInternalParamsState
},codeAt$1=stringMultibyte.codeAt,NativeURL=global_1.URL,URLSearchParams$1=web_urlSearchParams.URLSearchParams,getInternalSearchParamsState=web_urlSearchParams.getState,setInternalState$a=internalState.set,getInternalURLState=internalState.getterFor("URL"),floor$9=Math.floor,pow$4=Math.pow,ALPHA=/[A-Za-z]/,ALPHANUMERIC=/[\d+-.A-Za-z]/,DIGIT=/\d/,HEX_START=/^(0x|0X)/,OCT=/^[0-7]+$/,DEC=/^\d+$/,HEX=/^[\dA-Fa-f]+$/,FORBIDDEN_HOST_CODE_POINT=/[\u0000\u0009\u000A\u000D #%/:?@[\\]]/,FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT=/[\u0000\u0009\u000A\u000D #/:?@[\\]]/,LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE=/^[\u0000-\u001F ]+|[\u0000-\u001F ]+$/g,TAB_AND_NEW_LINE=/[\u0009\u000A\u000D]/g,parseHost=function(url,input){
var result,codePoints,index
;if("["==input.charAt(0)){
if("]"!=input.charAt(input.length-1))return"Invalid host"
;if(!(result=parseIPv6(input.slice(1,-1))))return"Invalid host"
;url.host=result}else if(isSpecial(url)){
if(input=function(input){
var i,label,encoded=[],labels=input.toLowerCase().replace(regexSeparators,".").split(".")
;for(i=0;i<labels.length;i++)label=labels[i],
encoded.push(regexNonASCII.test(label)?"xn--"+encode(label):label)
;return encoded.join(".")
}(input),FORBIDDEN_HOST_CODE_POINT.test(input))return"Invalid host"
;if(null===(result=parseIPv4(input)))return"Invalid host"
;url.host=result}else{
if(FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT.test(input))return"Invalid host"
;for(result="",
codePoints=arrayFrom(input),index=0;index<codePoints.length;index++)result+=percentEncode(codePoints[index],C0ControlPercentEncodeSet)
;url.host=result}},parseIPv4=function(input){
var partsLength,numbers,index,part,radix,number,ipv4,parts=input.split(".")
;if(parts.length&&""==parts[parts.length-1]&&parts.pop(),
(partsLength=parts.length)>4)return input
;for(numbers=[],index=0;index<partsLength;index++){
if(""==(part=parts[index]))return input
;if(radix=10,part.length>1&&"0"==part.charAt(0)&&(radix=HEX_START.test(part)?16:8,
part=part.slice(8==radix?1:2)),
""===part)number=0;else{
if(!(10==radix?DEC:8==radix?OCT:HEX).test(part))return input
;number=parseInt(part,radix)}numbers.push(number)}
for(index=0;index<partsLength;index++)if(number=numbers[index],
index==partsLength-1){
if(number>=pow$4(256,5-partsLength))return null
}else if(number>255)return null
;for(ipv4=numbers.pop(),index=0;index<numbers.length;index++)ipv4+=numbers[index]*pow$4(256,3-index)
;return ipv4},parseIPv6=function(input){
var value,length,numbersSeen,ipv4Piece,number,swaps,swap,address=[0,0,0,0,0,0,0,0],pieceIndex=0,compress=null,pointer=0,char=function(){
return input.charAt(pointer)};if(":"==char()){
if(":"!=input.charAt(1))return
;pointer+=2,compress=++pieceIndex}for(;char();){
if(8==pieceIndex)return;if(":"!=char()){
for(value=length=0;length<4&&HEX.test(char());)value=16*value+parseInt(char(),16),
pointer++,length++;if("."==char()){
if(0==length)return
;if(pointer-=length,pieceIndex>6)return
;for(numbersSeen=0;char();){
if(ipv4Piece=null,numbersSeen>0){
if(!("."==char()&&numbersSeen<4))return;pointer++}
if(!DIGIT.test(char()))return
;for(;DIGIT.test(char());){
if(number=parseInt(char(),10),null===ipv4Piece)ipv4Piece=number;else{
if(0==ipv4Piece)return
;ipv4Piece=10*ipv4Piece+number}
if(ipv4Piece>255)return;pointer++}
address[pieceIndex]=256*address[pieceIndex]+ipv4Piece,
2!=++numbersSeen&&4!=numbersSeen||pieceIndex++}
if(4!=numbersSeen)return;break}if(":"==char()){
if(pointer++,!char())return}else if(char())return
;address[pieceIndex++]=value}else{
if(null!==compress)return
;pointer++,compress=++pieceIndex}}
if(null!==compress)for(swaps=pieceIndex-compress,
pieceIndex=7;0!=pieceIndex&&swaps>0;)swap=address[pieceIndex],
address[pieceIndex--]=address[compress+swaps-1],
address[compress+--swaps]=swap;else if(8!=pieceIndex)return
;return address},serializeHost=function(host){
var result,index,compress,ignore0
;if("number"==typeof host){
for(result=[],index=0;index<4;index++)result.unshift(host%256),
host=floor$9(host/256);return result.join(".")}
if("object"==typeof host){
for(result="",compress=function(ipv6){
for(var maxIndex=null,maxLength=1,currStart=null,currLength=0,index=0;index<8;index++)0!==ipv6[index]?(currLength>maxLength&&(maxIndex=currStart,
maxLength=currLength),
currStart=null,currLength=0):(null===currStart&&(currStart=index),
++currLength)
;return currLength>maxLength&&(maxIndex=currStart,maxLength=currLength),
maxIndex
}(host),index=0;index<8;index++)ignore0&&0===host[index]||(ignore0&&(ignore0=!1),
compress===index?(result+=index?":":"::",
ignore0=!0):(result+=host[index].toString(16),
index<7&&(result+=":")));return"["+result+"]"}
return host
},C0ControlPercentEncodeSet={},fragmentPercentEncodeSet=objectAssign({},C0ControlPercentEncodeSet,{
" ":1,'"':1,"<":1,">":1,"`":1
}),pathPercentEncodeSet=objectAssign({},fragmentPercentEncodeSet,{
"#":1,"?":1,"{":1,"}":1
}),userinfoPercentEncodeSet=objectAssign({},pathPercentEncodeSet,{
"/":1,":":1,";":1,"=":1,"@":1,"[":1,"\\":1,"]":1,
"^":1,"|":1}),percentEncode=function(char,set){
var code=codeAt$1(char,0)
;return code>32&&code<127&&!has(set,char)?char:encodeURIComponent(char)
},specialSchemes={ftp:21,file:null,http:80,
https:443,ws:80,wss:443},isSpecial=function(url){
return has(specialSchemes,url.scheme)
},includesCredentials=function(url){
return""!=url.username||""!=url.password
},cannotHaveUsernamePasswordPort=function(url){
return!url.host||url.cannotBeABaseURL||"file"==url.scheme
},isWindowsDriveLetter=function(string,normalized){
var second
;return 2==string.length&&ALPHA.test(string.charAt(0))&&(":"==(second=string.charAt(1))||!normalized&&"|"==second)
},startsWithWindowsDriveLetter=function(string){
var third
;return string.length>1&&isWindowsDriveLetter(string.slice(0,2))&&(2==string.length||"/"===(third=string.charAt(2))||"\\"===third||"?"===third||"#"===third)
},shortenURLsPath=function(url){
var path=url.path,pathSize=path.length
;!pathSize||"file"==url.scheme&&1==pathSize&&isWindowsDriveLetter(path[0],!0)||path.pop()
},isSingleDot=function(segment){
return"."===segment||"%2e"===segment.toLowerCase()
},SCHEME_START={},SCHEME={},NO_SCHEME={},SPECIAL_RELATIVE_OR_AUTHORITY={},PATH_OR_AUTHORITY={},RELATIVE={},RELATIVE_SLASH={},SPECIAL_AUTHORITY_SLASHES={},SPECIAL_AUTHORITY_IGNORE_SLASHES={},AUTHORITY={},HOST={},HOSTNAME={},PORT={},FILE={},FILE_SLASH={},FILE_HOST={},PATH_START={},PATH={},CANNOT_BE_A_BASE_URL_PATH={},QUERY={},FRAGMENT={},parseURL=function(url,input,stateOverride,base){
var codePoints,char,bufferCodePoints,failure,segment,state=stateOverride||SCHEME_START,pointer=0,buffer="",seenAt=!1,seenBracket=!1,seenPasswordToken=!1
;for(stateOverride||(url.scheme="",
url.username="",url.password="",url.host=null,
url.port=null,url.path=[],url.query=null,
url.fragment=null,url.cannotBeABaseURL=!1,
input=input.replace(LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE,"")),
input=input.replace(TAB_AND_NEW_LINE,""),
codePoints=arrayFrom(input);pointer<=codePoints.length;){
switch(char=codePoints[pointer],state){
case SCHEME_START:if(!char||!ALPHA.test(char)){
if(stateOverride)return"Invalid scheme"
;state=NO_SCHEME;continue}
buffer+=char.toLowerCase(),state=SCHEME;break
;case SCHEME:
if(char&&(ALPHANUMERIC.test(char)||"+"==char||"-"==char||"."==char))buffer+=char.toLowerCase();else{
if(":"!=char){
if(stateOverride)return"Invalid scheme"
;buffer="",state=NO_SCHEME,pointer=0;continue}
if(stateOverride&&(isSpecial(url)!=has(specialSchemes,buffer)||"file"==buffer&&(includesCredentials(url)||null!==url.port)||"file"==url.scheme&&!url.host))return
;if(url.scheme=buffer,
stateOverride)return void(isSpecial(url)&&specialSchemes[url.scheme]==url.port&&(url.port=null))
;buffer="",
"file"==url.scheme?state=FILE:isSpecial(url)&&base&&base.scheme==url.scheme?state=SPECIAL_RELATIVE_OR_AUTHORITY:isSpecial(url)?state=SPECIAL_AUTHORITY_SLASHES:"/"==codePoints[pointer+1]?(state=PATH_OR_AUTHORITY,
pointer++):(url.cannotBeABaseURL=!0,
url.path.push(""),state=CANNOT_BE_A_BASE_URL_PATH)
}break;case NO_SCHEME:
if(!base||base.cannotBeABaseURL&&"#"!=char)return"Invalid scheme"
;if(base.cannotBeABaseURL&&"#"==char){
url.scheme=base.scheme,url.path=base.path.slice(),
url.query=base.query,url.fragment="",
url.cannotBeABaseURL=!0,state=FRAGMENT;break}
state="file"==base.scheme?FILE:RELATIVE;continue
;case SPECIAL_RELATIVE_OR_AUTHORITY:
if("/"!=char||"/"!=codePoints[pointer+1]){
state=RELATIVE;continue}
state=SPECIAL_AUTHORITY_IGNORE_SLASHES,pointer++
;break;case PATH_OR_AUTHORITY:if("/"==char){
state=AUTHORITY;break}state=PATH;continue
;case RELATIVE:
if(url.scheme=base.scheme,char==EOF)url.username=base.username,url.password=base.password,
url.host=base.host,
url.port=base.port,url.path=base.path.slice(),url.query=base.query;else if("/"==char||"\\"==char&&isSpecial(url))state=RELATIVE_SLASH;else if("?"==char)url.username=base.username,
url.password=base.password,
url.host=base.host,url.port=base.port,url.path=base.path.slice(),
url.query="",state=QUERY;else{if("#"!=char){
url.username=base.username,url.password=base.password,
url.host=base.host,url.port=base.port,
url.path=base.path.slice(),url.path.pop(),
state=PATH;continue}
url.username=base.username,url.password=base.password,url.host=base.host,
url.port=base.port,
url.path=base.path.slice(),url.query=base.query,url.fragment="",
state=FRAGMENT}break;case RELATIVE_SLASH:
if(!isSpecial(url)||"/"!=char&&"\\"!=char){
if("/"!=char){
url.username=base.username,url.password=base.password,url.host=base.host,
url.port=base.port,state=PATH;continue}
state=AUTHORITY
}else state=SPECIAL_AUTHORITY_IGNORE_SLASHES;break
;case SPECIAL_AUTHORITY_SLASHES:
if(state=SPECIAL_AUTHORITY_IGNORE_SLASHES,"/"!=char||"/"!=buffer.charAt(pointer+1))continue
;pointer++;break
;case SPECIAL_AUTHORITY_IGNORE_SLASHES:
if("/"!=char&&"\\"!=char){state=AUTHORITY;continue
}break;case AUTHORITY:if("@"==char){
seenAt&&(buffer="%40"+buffer),seenAt=!0,bufferCodePoints=arrayFrom(buffer)
;for(var i=0;i<bufferCodePoints.length;i++){
var codePoint=bufferCodePoints[i]
;if(":"!=codePoint||seenPasswordToken){
var encodedCodePoints=percentEncode(codePoint,userinfoPercentEncodeSet)
;seenPasswordToken?url.password+=encodedCodePoints:url.username+=encodedCodePoints
}else seenPasswordToken=!0}buffer=""
}else if(char==EOF||"/"==char||"?"==char||"#"==char||"\\"==char&&isSpecial(url)){
if(seenAt&&""==buffer)return"Invalid authority"
;pointer-=arrayFrom(buffer).length+1,
buffer="",state=HOST}else buffer+=char;break
;case HOST:case HOSTNAME:
if(stateOverride&&"file"==url.scheme){
state=FILE_HOST;continue}
if(":"!=char||seenBracket){
if(char==EOF||"/"==char||"?"==char||"#"==char||"\\"==char&&isSpecial(url)){
if(isSpecial(url)&&""==buffer)return"Invalid host"
;if(stateOverride&&""==buffer&&(includesCredentials(url)||null!==url.port))return
;if(failure=parseHost(url,buffer))return failure
;if(buffer="",state=PATH_START,stateOverride)return
;continue}
"["==char?seenBracket=!0:"]"==char&&(seenBracket=!1),buffer+=char
}else{if(""==buffer)return"Invalid host"
;if(failure=parseHost(url,buffer))return failure
;if(buffer="",state=PORT,stateOverride==HOSTNAME)return
}break;case PORT:if(!DIGIT.test(char)){
if(char==EOF||"/"==char||"?"==char||"#"==char||"\\"==char&&isSpecial(url)||stateOverride){
if(""!=buffer){var port=parseInt(buffer,10)
;if(port>65535)return"Invalid port"
;url.port=isSpecial(url)&&port===specialSchemes[url.scheme]?null:port,
buffer=""}if(stateOverride)return;state=PATH_START
;continue}return"Invalid port"}buffer+=char;break
;case FILE:
if(url.scheme="file","/"==char||"\\"==char)state=FILE_SLASH;else{
if(!base||"file"!=base.scheme){state=PATH;continue
}
if(char==EOF)url.host=base.host,url.path=base.path.slice(),url.query=base.query;else if("?"==char)url.host=base.host,
url.path=base.path.slice(),
url.query="",state=QUERY;else{if("#"!=char){
startsWithWindowsDriveLetter(codePoints.slice(pointer).join(""))||(url.host=base.host,
url.path=base.path.slice(),
shortenURLsPath(url)),state=PATH;continue}
url.host=base.host,url.path=base.path.slice(),
url.query=base.query,url.fragment="",
state=FRAGMENT}}break;case FILE_SLASH:
if("/"==char||"\\"==char){state=FILE_HOST;break}
base&&"file"==base.scheme&&!startsWithWindowsDriveLetter(codePoints.slice(pointer).join(""))&&(isWindowsDriveLetter(base.path[0],!0)?url.path.push(base.path[0]):url.host=base.host),
state=PATH;continue;case FILE_HOST:
if(char==EOF||"/"==char||"\\"==char||"?"==char||"#"==char){
if(!stateOverride&&isWindowsDriveLetter(buffer))state=PATH;else if(""==buffer){
if(url.host="",stateOverride)return
;state=PATH_START}else{
if(failure=parseHost(url,buffer))return failure
;if("localhost"==url.host&&(url.host=""),
stateOverride)return;buffer="",state=PATH_START}
continue}buffer+=char;break;case PATH_START:
if(isSpecial(url)){
if(state=PATH,"/"!=char&&"\\"!=char)continue
}else if(stateOverride||"?"!=char)if(stateOverride||"#"!=char){
if(char!=EOF&&(state=PATH,"/"!=char))continue
}else url.fragment="",state=FRAGMENT;else url.query="",
state=QUERY;break;case PATH:
if(char==EOF||"/"==char||"\\"==char&&isSpecial(url)||!stateOverride&&("?"==char||"#"==char)){
if(".."===(segment=(segment=buffer).toLowerCase())||"%2e."===segment||".%2e"===segment||"%2e%2e"===segment?(shortenURLsPath(url),
"/"==char||"\\"==char&&isSpecial(url)||url.path.push("")):isSingleDot(buffer)?"/"==char||"\\"==char&&isSpecial(url)||url.path.push(""):("file"==url.scheme&&!url.path.length&&isWindowsDriveLetter(buffer)&&(url.host&&(url.host=""),
buffer=buffer.charAt(0)+":"),
url.path.push(buffer)),buffer="","file"==url.scheme&&(char==EOF||"?"==char||"#"==char))for(;url.path.length>1&&""===url.path[0];)url.path.shift()
;"?"==char?(url.query="",
state=QUERY):"#"==char&&(url.fragment="",state=FRAGMENT)
}else buffer+=percentEncode(char,pathPercentEncodeSet)
;break;case CANNOT_BE_A_BASE_URL_PATH:
"?"==char?(url.query="",state=QUERY):"#"==char?(url.fragment="",
state=FRAGMENT):char!=EOF&&(url.path[0]+=percentEncode(char,C0ControlPercentEncodeSet))
;break;case QUERY:
stateOverride||"#"!=char?char!=EOF&&("'"==char&&isSpecial(url)?url.query+="%27":url.query+="#"==char?"%23":percentEncode(char,C0ControlPercentEncodeSet)):(url.fragment="",
state=FRAGMENT);break;case FRAGMENT:
char!=EOF&&(url.fragment+=percentEncode(char,fragmentPercentEncodeSet))
}pointer++}},URLConstructor=function(url){
var baseState,failure,that=anInstance(this,URLConstructor,"URL"),base=arguments.length>1?arguments[1]:void 0,urlString=String(url),state=setInternalState$a(that,{
type:"URL"})
;if(void 0!==base)if(base instanceof URLConstructor)baseState=getInternalURLState(base);else if(failure=parseURL(baseState={},String(base)))throw TypeError(failure)
;if(failure=parseURL(state,urlString,null,baseState))throw TypeError(failure)
;var searchParams=state.searchParams=new URLSearchParams$1,searchParamsState=getInternalSearchParamsState(searchParams)
;searchParamsState.updateSearchParams(state.query),
searchParamsState.updateURL=function(){
state.query=String(searchParams)||null
},descriptors||(that.href=serializeURL.call(that),
that.origin=getOrigin.call(that),
that.protocol=getProtocol.call(that),that.username=getUsername.call(that),
that.password=getPassword.call(that),
that.host=getHost.call(that),that.hostname=getHostname.call(that),
that.port=getPort.call(that),
that.pathname=getPathname.call(that),that.search=getSearch.call(that),
that.searchParams=getSearchParams.call(that),
that.hash=getHash.call(that))
},URLPrototype=URLConstructor.prototype,serializeURL=function(){
var url=getInternalURLState(this),scheme=url.scheme,username=url.username,password=url.password,host=url.host,port=url.port,path=url.path,query=url.query,fragment=url.fragment,output=scheme+":"
;return null!==host?(output+="//",
includesCredentials(url)&&(output+=username+(password?":"+password:"")+"@"),
output+=serializeHost(host),
null!==port&&(output+=":"+port)):"file"==scheme&&(output+="//"),
output+=url.cannotBeABaseURL?path[0]:path.length?"/"+path.join("/"):"",
null!==query&&(output+="?"+query),
null!==fragment&&(output+="#"+fragment),output
},getOrigin=function(){
var url=getInternalURLState(this),scheme=url.scheme,port=url.port
;if("blob"==scheme)try{
return new URL(scheme.path[0]).origin
}catch(error){return"null"}
return"file"!=scheme&&isSpecial(url)?scheme+"://"+serializeHost(url.host)+(null!==port?":"+port:""):"null"
},getProtocol=function(){
return getInternalURLState(this).scheme+":"
},getUsername=function(){
return getInternalURLState(this).username
},getPassword=function(){
return getInternalURLState(this).password
},getHost=function(){
var url=getInternalURLState(this),host=url.host,port=url.port
;return null===host?"":null===port?serializeHost(host):serializeHost(host)+":"+port
},getHostname=function(){
var host=getInternalURLState(this).host
;return null===host?"":serializeHost(host)
},getPort=function(){
var port=getInternalURLState(this).port
;return null===port?"":String(port)
},getPathname=function(){
var url=getInternalURLState(this),path=url.path
;return url.cannotBeABaseURL?path[0]:path.length?"/"+path.join("/"):""
},getSearch=function(){
var query=getInternalURLState(this).query
;return query?"?"+query:""
},getSearchParams=function(){
return getInternalURLState(this).searchParams
},getHash=function(){
var fragment=getInternalURLState(this).fragment
;return fragment?"#"+fragment:""
},accessorDescriptor=function(getter,setter){
return{get:getter,set:setter,configurable:!0,
enumerable:!0}}
;if(descriptors&&objectDefineProperties(URLPrototype,{
href:accessorDescriptor(serializeURL,(function(href){
var url=getInternalURLState(this),urlString=String(href),failure=parseURL(url,urlString)
;if(failure)throw TypeError(failure)
;getInternalSearchParamsState(url.searchParams).updateSearchParams(url.query)
})),origin:accessorDescriptor(getOrigin),
protocol:accessorDescriptor(getProtocol,(function(protocol){
var url=getInternalURLState(this)
;parseURL(url,String(protocol)+":",SCHEME_START)
})),
username:accessorDescriptor(getUsername,(function(username){
var url=getInternalURLState(this),codePoints=arrayFrom(String(username))
;if(!cannotHaveUsernamePasswordPort(url)){
url.username=""
;for(var i=0;i<codePoints.length;i++)url.username+=percentEncode(codePoints[i],userinfoPercentEncodeSet)
}})),
password:accessorDescriptor(getPassword,(function(password){
var url=getInternalURLState(this),codePoints=arrayFrom(String(password))
;if(!cannotHaveUsernamePasswordPort(url)){
url.password=""
;for(var i=0;i<codePoints.length;i++)url.password+=percentEncode(codePoints[i],userinfoPercentEncodeSet)
}})),
host:accessorDescriptor(getHost,(function(host){
var url=getInternalURLState(this)
;url.cannotBeABaseURL||parseURL(url,String(host),HOST)
})),
hostname:accessorDescriptor(getHostname,(function(hostname){
var url=getInternalURLState(this)
;url.cannotBeABaseURL||parseURL(url,String(hostname),HOSTNAME)
})),
port:accessorDescriptor(getPort,(function(port){
var url=getInternalURLState(this)
;cannotHaveUsernamePasswordPort(url)||(""==(port=String(port))?url.port=null:parseURL(url,port,PORT))
})),
pathname:accessorDescriptor(getPathname,(function(pathname){
var url=getInternalURLState(this)
;url.cannotBeABaseURL||(url.path=[],parseURL(url,pathname+"",PATH_START))
})),
search:accessorDescriptor(getSearch,(function(search){
var url=getInternalURLState(this)
;""==(search=String(search))?url.query=null:("?"==search.charAt(0)&&(search=search.slice(1)),
url.query="",
parseURL(url,search,QUERY)),getInternalSearchParamsState(url.searchParams).updateSearchParams(url.query)
})),
searchParams:accessorDescriptor(getSearchParams),
hash:accessorDescriptor(getHash,(function(hash){
var url=getInternalURLState(this)
;""!=(hash=String(hash))?("#"==hash.charAt(0)&&(hash=hash.slice(1)),
url.fragment="",
parseURL(url,hash,FRAGMENT)):url.fragment=null}))
}),redefine(URLPrototype,"toJSON",(function(){
return serializeURL.call(this)}),{enumerable:!0
}),redefine(URLPrototype,"toString",(function(){
return serializeURL.call(this)}),{enumerable:!0
}),NativeURL){
var nativeCreateObjectURL=NativeURL.createObjectURL,nativeRevokeObjectURL=NativeURL.revokeObjectURL
;nativeCreateObjectURL&&redefine(URLConstructor,"createObjectURL",(function(blob){
return nativeCreateObjectURL.apply(NativeURL,arguments)
})),nativeRevokeObjectURL&&redefine(URLConstructor,"revokeObjectURL",(function(url){
return nativeRevokeObjectURL.apply(NativeURL,arguments)
}))}setToStringTag(URLConstructor,"URL"),_export({
global:!0,forced:!nativeUrl,sham:!descriptors},{
URL:URLConstructor}),_export({target:"URL",
proto:!0,enumerable:!0},{toJSON:function(){
return URL.prototype.toString.call(this)}})
;var defineProperty$c=objectDefineProperty.f
;descriptors&&!("lastIndex"in[])&&(defineProperty$c(Array.prototype,"lastIndex",{
configurable:!0,get:function(){
var O=toObject(this),len=toLength(O.length)
;return 0==len?0:len-1}
}),addToUnscopables("lastIndex"))
;var defineProperty$d=objectDefineProperty.f
;descriptors&&!("lastItem"in[])&&(defineProperty$d(Array.prototype,"lastItem",{
configurable:!0,get:function(){
var O=toObject(this),len=toLength(O.length)
;return 0==len?void 0:O[len-1]},
set:function(value){
var O=toObject(this),len=toLength(O.length)
;return O[0==len?0:len-1]=value}
}),addToUnscopables("lastItem")),_export({
target:"Map",stat:!0},{
groupBy:function(iterable,keyDerivative){
var newMap=new this;aFunction$1(keyDerivative)
;var has=aFunction$1(newMap.has),get=aFunction$1(newMap.get),set=aFunction$1(newMap.set)
;return iterate_1(iterable,(function(element){
var derivedKey=keyDerivative(element)
;has.call(newMap,derivedKey)?get.call(newMap,derivedKey).push(element):set.call(newMap,derivedKey,[element])
})),newMap}}),_export({target:"Map",stat:!0},{
keyBy:function(iterable,keyDerivative){
var newMap=new this;aFunction$1(keyDerivative)
;var setter=aFunction$1(newMap.set)
;return iterate_1(iterable,(function(element){
setter.call(newMap,keyDerivative(element),element)
})),newMap}});var collectionDeleteAll=function(){
for(var wasDeleted,collection=anObject(this),remover=aFunction$1(collection.delete),allDeleted=!0,k=0,len=arguments.length;k<len;k++)wasDeleted=remover.call(collection,arguments[k]),
allDeleted=allDeleted&&wasDeleted
;return!!allDeleted};_export({target:"Map",
proto:!0,real:!0,forced:false},{
deleteAll:function(){
return collectionDeleteAll.apply(this,arguments)}
});var getMapIterator=function(it){
return Map.prototype.entries.call(it)};_export({
target:"Map",proto:!0,real:!0,forced:false},{
every:function(callbackfn){
var map=anObject(this),iterator=getMapIterator(map),boundFunction=functionBindContext(callbackfn,arguments.length>1?arguments[1]:void 0,3)
;return!iterate_1(iterator,(function(key,value){
if(!boundFunction(value,key,map))return iterate_1.stop()
}),void 0,!0,!0).stopped}}),_export({target:"Map",
proto:!0,real:!0,forced:false},{
filter:function(callbackfn){
var map=anObject(this),iterator=getMapIterator(map),boundFunction=functionBindContext(callbackfn,arguments.length>1?arguments[1]:void 0,3),newMap=new(speciesConstructor(map,getBuiltIn("Map"))),setter=aFunction$1(newMap.set)
;return iterate_1(iterator,(function(key,value){
boundFunction(value,key,map)&&setter.call(newMap,key,value)
}),void 0,!0,!0),newMap}}),_export({target:"Map",
proto:!0,real:!0,forced:false},{
find:function(callbackfn){
var map=anObject(this),iterator=getMapIterator(map),boundFunction=functionBindContext(callbackfn,arguments.length>1?arguments[1]:void 0,3)
;return iterate_1(iterator,(function(key,value){
if(boundFunction(value,key,map))return iterate_1.stop(value)
}),void 0,!0,!0).result}}),_export({target:"Map",
proto:!0,real:!0,forced:false},{
findKey:function(callbackfn){
var map=anObject(this),iterator=getMapIterator(map),boundFunction=functionBindContext(callbackfn,arguments.length>1?arguments[1]:void 0,3)
;return iterate_1(iterator,(function(key,value){
if(boundFunction(value,key,map))return iterate_1.stop(key)
}),void 0,!0,!0).result}});_export({target:"Map",
proto:!0,real:!0,forced:false},{
includes:function(searchElement){
return iterate_1(getMapIterator(anObject(this)),(function(key,value){
if((x=value)===(y=searchElement)||x!=x&&y!=y)return iterate_1.stop()
;var x,y}),void 0,!0,!0).stopped}}),_export({
target:"Map",proto:!0,real:!0,forced:false},{
keyOf:function(searchElement){
return iterate_1(getMapIterator(anObject(this)),(function(key,value){
if(value===searchElement)return iterate_1.stop(key)
}),void 0,!0,!0).result}}),_export({target:"Map",
proto:!0,real:!0,forced:false},{
mapKeys:function(callbackfn){
var map=anObject(this),iterator=getMapIterator(map),boundFunction=functionBindContext(callbackfn,arguments.length>1?arguments[1]:void 0,3),newMap=new(speciesConstructor(map,getBuiltIn("Map"))),setter=aFunction$1(newMap.set)
;return iterate_1(iterator,(function(key,value){
setter.call(newMap,boundFunction(value,key,map),value)
}),void 0,!0,!0),newMap}}),_export({target:"Map",
proto:!0,real:!0,forced:false},{
mapValues:function(callbackfn){
var map=anObject(this),iterator=getMapIterator(map),boundFunction=functionBindContext(callbackfn,arguments.length>1?arguments[1]:void 0,3),newMap=new(speciesConstructor(map,getBuiltIn("Map"))),setter=aFunction$1(newMap.set)
;return iterate_1(iterator,(function(key,value){
setter.call(newMap,key,boundFunction(value,key,map))
}),void 0,!0,!0),newMap}}),_export({target:"Map",
proto:!0,real:!0,forced:false},{
merge:function(iterable){
for(var map=anObject(this),setter=aFunction$1(map.set),i=0;i<arguments.length;)iterate_1(arguments[i++],setter,map,!0)
;return map}}),_export({target:"Map",proto:!0,
real:!0,forced:false},{
reduce:function(callbackfn){
var map=anObject(this),iterator=getMapIterator(map),noInitial=arguments.length<2,accumulator=noInitial?void 0:arguments[1]
;if(aFunction$1(callbackfn),
iterate_1(iterator,(function(key,value){
noInitial?(noInitial=!1,accumulator=value):accumulator=callbackfn(accumulator,value,key,map)
}),void 0,!0,!0),
noInitial)throw TypeError("Reduce of empty map with no initial value")
;return accumulator}}),_export({target:"Map",
proto:!0,real:!0,forced:false},{
some:function(callbackfn){
var map=anObject(this),iterator=getMapIterator(map),boundFunction=functionBindContext(callbackfn,arguments.length>1?arguments[1]:void 0,3)
;return iterate_1(iterator,(function(key,value){
if(boundFunction(value,key,map))return iterate_1.stop()
}),void 0,!0,!0).stopped}}),_export({target:"Map",
proto:!0,real:!0,forced:false},{
update:function(key,callback){
var map=anObject(this),length=arguments.length
;aFunction$1(callback)
;var isPresentInMap=map.has(key)
;if(!isPresentInMap&&length<3)throw TypeError("Updating absent value")
;var value=isPresentInMap?map.get(key):aFunction$1(length>2?arguments[2]:void 0)(key,map)
;return map.set(key,callback(value,key,map)),map}
});var collectionAddAll=function(){
for(var set=anObject(this),adder=aFunction$1(set.add),k=0,len=arguments.length;k<len;k++)adder.call(set,arguments[k])
;return set};_export({target:"Set",proto:!0,
real:!0,forced:false},{addAll:function(){
return collectionAddAll.apply(this,arguments)}
}),_export({target:"Set",proto:!0,real:!0,
forced:false},{deleteAll:function(){
return collectionDeleteAll.apply(this,arguments)}
});var getSetIterator=function(it){
return Set.prototype.values.call(it)};_export({
target:"Set",proto:!0,real:!0,forced:false},{
every:function(callbackfn){
var set=anObject(this),iterator=getSetIterator(set),boundFunction=functionBindContext(callbackfn,arguments.length>1?arguments[1]:void 0,3)
;return!iterate_1(iterator,(function(value){
if(!boundFunction(value,value,set))return iterate_1.stop()
}),void 0,!1,!0).stopped}}),_export({target:"Set",
proto:!0,real:!0,forced:false},{
filter:function(callbackfn){
var set=anObject(this),iterator=getSetIterator(set),boundFunction=functionBindContext(callbackfn,arguments.length>1?arguments[1]:void 0,3),newSet=new(speciesConstructor(set,getBuiltIn("Set"))),adder=aFunction$1(newSet.add)
;return iterate_1(iterator,(function(value){
boundFunction(value,value,set)&&adder.call(newSet,value)
}),void 0,!1,!0),newSet}}),_export({target:"Set",
proto:!0,real:!0,forced:false},{
find:function(callbackfn){
var set=anObject(this),iterator=getSetIterator(set),boundFunction=functionBindContext(callbackfn,arguments.length>1?arguments[1]:void 0,3)
;return iterate_1(iterator,(function(value){
if(boundFunction(value,value,set))return iterate_1.stop(value)
}),void 0,!1,!0).result}}),_export({target:"Set",
proto:!0,real:!0,forced:false},{
join:function(separator){
var set=anObject(this),iterator=getSetIterator(set),sep=void 0===separator?",":String(separator),result=[]
;return iterate_1(iterator,result.push,result,!1,!0),
result.join(sep)}}),_export({target:"Set",
proto:!0,real:!0,forced:false},{
map:function(callbackfn){
var set=anObject(this),iterator=getSetIterator(set),boundFunction=functionBindContext(callbackfn,arguments.length>1?arguments[1]:void 0,3),newSet=new(speciesConstructor(set,getBuiltIn("Set"))),adder=aFunction$1(newSet.add)
;return iterate_1(iterator,(function(value){
adder.call(newSet,boundFunction(value,value,set))
}),void 0,!1,!0),newSet}}),_export({target:"Set",
proto:!0,real:!0,forced:false},{
reduce:function(callbackfn){
var set=anObject(this),iterator=getSetIterator(set),noInitial=arguments.length<2,accumulator=noInitial?void 0:arguments[1]
;if(aFunction$1(callbackfn),
iterate_1(iterator,(function(value){
noInitial?(noInitial=!1,accumulator=value):accumulator=callbackfn(accumulator,value,value,set)
}),void 0,!1,!0),
noInitial)throw TypeError("Reduce of empty set with no initial value")
;return accumulator}}),_export({target:"Set",
proto:!0,real:!0,forced:false},{
some:function(callbackfn){
var set=anObject(this),iterator=getSetIterator(set),boundFunction=functionBindContext(callbackfn,arguments.length>1?arguments[1]:void 0,3)
;return iterate_1(iterator,(function(value){
if(boundFunction(value,value,set))return iterate_1.stop()
}),void 0,!1,!0).stopped}}),_export({
target:"WeakMap",proto:!0,real:!0,forced:false},{
deleteAll:function(){
return collectionDeleteAll.apply(this,arguments)}
}),_export({target:"WeakSet",proto:!0,real:!0,
forced:false},{addAll:function(){
return collectionAddAll.apply(this,arguments)}
}),_export({target:"WeakSet",proto:!0,real:!0,
forced:false},{deleteAll:function(){
return collectionDeleteAll.apply(this,arguments)}
});var collectionFrom=function(source){
var mapping,A,n,boundFunction,length=arguments.length,mapFn=length>1?arguments[1]:void 0
;return aFunction$1(this),
(mapping=void 0!==mapFn)&&aFunction$1(mapFn),null==source?new this:(A=[],
mapping?(n=0,
boundFunction=functionBindContext(mapFn,length>2?arguments[2]:void 0,2),
iterate_1(source,(function(nextItem){
A.push(boundFunction(nextItem,n++))
}))):iterate_1(source,A.push,A),new this(A))}
;_export({target:"Map",stat:!0},{
from:collectionFrom});var collectionOf=function(){
for(var length=arguments.length,A=new Array(length);length--;)A[length]=arguments[length]
;return new this(A)};_export({target:"Map",stat:!0
},{of:collectionOf}),_export({target:"Set",stat:!0
},{from:collectionFrom}),_export({target:"Set",
stat:!0},{of:collectionOf}),_export({
target:"WeakMap",stat:!0},{from:collectionFrom
}),_export({target:"WeakMap",stat:!0},{
of:collectionOf}),_export({target:"WeakSet",
stat:!0},{from:collectionFrom}),_export({
target:"WeakSet",stat:!0},{of:collectionOf})
;var Node=function(){
this.object=null,this.symbol=null,this.primitives=null,this.objectsByIndex=objectCreate(null)
};Node.prototype.get=function(key,initializer){
return this[key]||(this[key]=initializer())
},Node.prototype.next=function(i,it,IS_OBJECT){
var store=IS_OBJECT?this.objectsByIndex[i]||(this.objectsByIndex[i]=new es_weakMap):this.primitives||(this.primitives=new es_map),entry=store.get(it)
;return entry||store.set(it,entry=new Node),entry}
;var root=new Node,compositeKey=function(){
var i,it,active=root,length=arguments.length
;for(i=0;i<length;i++)isObject(it=arguments[i])&&(active=active.next(i,it,!0))
;if(this===Object&&active===root)throw TypeError("Composite keys must contain a non-primitive component")
;for(i=0;i<length;i++)isObject(it=arguments[i])||(active=active.next(i,it,!1))
;return active},initializer=function(){
var freeze=getBuiltIn("Object","freeze")
;return freeze?freeze(objectCreate(null)):objectCreate(null)
};_export({global:!0},{compositeKey:function(){
return compositeKey.apply(Object,arguments).get("object",initializer)
}}),_export({global:!0},{
compositeSymbol:function(){
return 1===arguments.length&&"string"==typeof arguments[0]?getBuiltIn("Symbol").for(arguments[0]):compositeKey.apply(null,arguments).get("symbol",getBuiltIn("Symbol"))
}});var min$9=Math.min,max$4=Math.max;_export({
target:"Math",stat:!0},{
clamp:function(x,lower,upper){
return min$9(upper,max$4(lower,x))}}),_export({
target:"Math",stat:!0},{DEG_PER_RAD:Math.PI/180})
;var RAD_PER_DEG=180/Math.PI;_export({
target:"Math",stat:!0},{degrees:function(radians){
return radians*RAD_PER_DEG}})
;var mathScale=Math.scale||function(x,inLow,inHigh,outLow,outHigh){
return 0===arguments.length||x!=x||inLow!=inLow||inHigh!=inHigh||outLow!=outLow||outHigh!=outHigh?NaN:x===1/0||x===-1/0?x:(x-inLow)*(outHigh-outLow)/(inHigh-inLow)+outLow
};_export({target:"Math",stat:!0},{
fscale:function(x,inLow,inHigh,outLow,outHigh){
return mathFround(mathScale(x,inLow,inHigh,outLow,outHigh))
}}),_export({target:"Math",stat:!0},{
RAD_PER_DEG:180/Math.PI})
;var DEG_PER_RAD=Math.PI/180;_export({
target:"Math",stat:!0},{radians:function(degrees){
return degrees*DEG_PER_RAD}}),_export({
target:"Math",stat:!0},{scale:mathScale
}),_export({target:"Math",stat:!0},{
signbit:function(x){
return(x=+x)==x&&0==x?1/x==-1/0:x<0}})
;var valid=/^[\da-z]+$/;_export({target:"Number",
stat:!0},{fromString:function(string,radix){
var R,mathNum,sign=1
;if("string"!=typeof string)throw TypeError("Invalid number representation")
;if(!string.length)throw SyntaxError("Invalid number representation")
;if("-"==string.charAt(0)&&(sign=-1,
!(string=string.slice(1)).length))throw SyntaxError("Invalid number representation")
;if((R=void 0===radix?10:toInteger(radix))<2||R>36)throw RangeError("Invalid radix")
;if(!valid.test(string)||(mathNum=numberParseInt(string,R)).toString(R)!==string)throw SyntaxError("Invalid number representation")
;return sign*mathNum}})
;var setInternalState$b=internalState.set,getInternalState$7=internalState.getterFor("Object Iterator"),objectIterator=createIteratorConstructor((function(source,mode){
var object=toObject(source)
;setInternalState$b(this,{type:"Object Iterator",
mode:mode,object:object,keys:objectKeys(object),
index:0})}),"Object",(function(){
for(var state=getInternalState$7(this),keys=state.keys;;){
if(null===keys||state.index>=keys.length)return state.object=state.keys=null,
{value:void 0,done:!0}
;var key=keys[state.index++],object=state.object
;if(has(object,key)){switch(state.mode){
case"keys":return{value:key,done:!1};case"values":
return{value:object[key],done:!1}}return{
value:[key,object[key]],done:!1}}}}));_export({
target:"Object",stat:!0},{
iterateEntries:function(object){
return new objectIterator(object,"entries")}
}),_export({target:"Object",stat:!0},{
iterateKeys:function(object){
return new objectIterator(object,"keys")}
}),_export({target:"Object",stat:!0},{
iterateValues:function(object){
return new objectIterator(object,"values")}})
;var defineProperty$e=objectDefineProperty.f,OBSERVABLE=wellKnownSymbol("observable"),getInternalState$8=internalState.get,setInternalState$c=internalState.set,getMethod=function(fn){
return null==fn?void 0:aFunction$1(fn)
},cleanupSubscription=function(subscriptionState){
var cleanup=subscriptionState.cleanup;if(cleanup){
subscriptionState.cleanup=void 0;try{cleanup()
}catch(error){hostReportErrors(error)}}
},subscriptionClosed=function(subscriptionState){
return void 0===subscriptionState.observer
},close=function(subscription,subscriptionState){
if(!descriptors){subscription.closed=!0
;var subscriptionObserver=subscriptionState.subscriptionObserver
;subscriptionObserver&&(subscriptionObserver.closed=!0)
}subscriptionState.observer=void 0
},Subscription=function(observer,subscriber){
var start,subscriptionState=setInternalState$c(this,{
cleanup:void 0,observer:anObject(observer),
subscriptionObserver:void 0})
;descriptors||(this.closed=!1);try{
(start=getMethod(observer.start))&&start.call(observer,this)
}catch(error){hostReportErrors(error)}
if(!subscriptionClosed(subscriptionState)){
var subscriptionObserver=subscriptionState.subscriptionObserver=new SubscriptionObserver(this)
;try{
var cleanup=subscriber(subscriptionObserver),subscription=cleanup
;null!=cleanup&&(subscriptionState.cleanup="function"==typeof cleanup.unsubscribe?function(){
subscription.unsubscribe()}:aFunction$1(cleanup))
}catch(error){
return void subscriptionObserver.error(error)}
subscriptionClosed(subscriptionState)&&cleanupSubscription(subscriptionState)
}};Subscription.prototype=redefineAll({},{
unsubscribe:function(){
var subscriptionState=getInternalState$8(this)
;subscriptionClosed(subscriptionState)||(close(this,subscriptionState),
cleanupSubscription(subscriptionState))}
}),descriptors&&defineProperty$e(Subscription.prototype,"closed",{
configurable:!0,get:function(){
return subscriptionClosed(getInternalState$8(this))
}})
;var SubscriptionObserver=function(subscription){
setInternalState$c(this,{subscription:subscription
}),descriptors||(this.closed=!1)}
;SubscriptionObserver.prototype=redefineAll({},{
next:function(value){
var subscriptionState=getInternalState$8(getInternalState$8(this).subscription)
;if(!subscriptionClosed(subscriptionState)){
var observer=subscriptionState.observer;try{
var nextMethod=getMethod(observer.next)
;nextMethod&&nextMethod.call(observer,value)
}catch(error){hostReportErrors(error)}}},
error:function(value){
var subscription=getInternalState$8(this).subscription,subscriptionState=getInternalState$8(subscription)
;if(!subscriptionClosed(subscriptionState)){
var observer=subscriptionState.observer
;close(subscription,subscriptionState);try{
var errorMethod=getMethod(observer.error)
;errorMethod?errorMethod.call(observer,value):hostReportErrors(value)
}catch(err){hostReportErrors(err)}
cleanupSubscription(subscriptionState)}},
complete:function(){
var subscription=getInternalState$8(this).subscription,subscriptionState=getInternalState$8(subscription)
;if(!subscriptionClosed(subscriptionState)){
var observer=subscriptionState.observer
;close(subscription,subscriptionState);try{
var completeMethod=getMethod(observer.complete)
;completeMethod&&completeMethod.call(observer)
}catch(error){hostReportErrors(error)}
cleanupSubscription(subscriptionState)}}
}),descriptors&&defineProperty$e(SubscriptionObserver.prototype,"closed",{
configurable:!0,get:function(){
return subscriptionClosed(getInternalState$8(getInternalState$8(this).subscription))
}});var $Observable=function(subscriber){
anInstance(this,$Observable,"Observable"),
setInternalState$c(this,{
subscriber:aFunction$1(subscriber)})}
;redefineAll($Observable.prototype,{
subscribe:function(observer){
var length=arguments.length
;return new Subscription("function"==typeof observer?{
next:observer,error:length>1?arguments[1]:void 0,
complete:length>2?arguments[2]:void 0
}:isObject(observer)?observer:{},getInternalState$8(this).subscriber)
}}),redefineAll($Observable,{from:function(x){
var C="function"==typeof this?this:$Observable,observableMethod=getMethod(anObject(x)[OBSERVABLE])
;if(observableMethod){
var observable=anObject(observableMethod.call(x))
;return observable.constructor===C?observable:new C((function(observer){
return observable.subscribe(observer)}))}
var iterator=getIterator(x)
;return new C((function(observer){
iterate_1(iterator,(function(it){
if(observer.next(it),observer.closed)return iterate_1.stop()
}),void 0,!1,!0),observer.complete()}))},
of:function(){
for(var C="function"==typeof this?this:$Observable,length=arguments.length,items=new Array(length),index=0;index<length;)items[index]=arguments[index++]
;return new C((function(observer){
for(var i=0;i<length;i++)if(observer.next(items[i]),
observer.closed)return;observer.complete()}))}
}),createNonEnumerableProperty($Observable.prototype,OBSERVABLE,(function(){
return this})),_export({global:!0},{
Observable:$Observable
}),setSpecies("Observable"),defineWellKnownSymbol("observable"),
defineWellKnownSymbol("patternMatch"),_export({
target:"Promise",stat:!0},{
try:function(callbackfn){
var promiseCapability=newPromiseCapability.f(this),result=perform(callbackfn)
;return(result.error?promiseCapability.reject:promiseCapability.resolve)(result.value),
promiseCapability.promise}})
;var setInternalState$d=internalState.set,getInternalState$9=internalState.getterFor("Seeded Random Generator"),$SeededRandomGenerator=createIteratorConstructor((function(seed){
setInternalState$d(this,{
type:"Seeded Random Generator",
seed:seed%2147483647})
}),"Seeded Random",(function(){
var state=getInternalState$9(this);return{
value:(1073741823&(state.seed=(1103515245*state.seed+12345)%2147483647))/1073741823,
done:!1}}));_export({target:"Math",stat:!0,
forced:!0},{seededPRNG:function(it){
var seed=anObject(it).seed
;if(!numberIsFinite(seed))throw TypeError('Math.seededPRNG() argument should have a "seed" field with a finite value.')
;return new $SeededRandomGenerator(seed)}})
;var codeAt$2=stringMultibyte.codeAt,charAt$3=stringMultibyte.charAt,setInternalState$e=internalState.set,getInternalState$a=internalState.getterFor("String Iterator"),$StringIterator=createIteratorConstructor((function(string){
setInternalState$e(this,{type:"String Iterator",
string:string,index:0})}),"String",(function(){
var point,state=getInternalState$a(this),string=state.string,index=state.index
;return index>=string.length?{value:void 0,done:!0
}:(point=charAt$3(string,index),
state.index+=point.length,{value:{
codePoint:codeAt$2(point,0),position:index},
done:!1})}));_export({target:"String",proto:!0},{
codePoints:function(){
return new $StringIterator(String(requireObjectCoercible(this)))
}})
;var isFrozen=Object.isFrozen,isFrozenStringArray=function(array,allowUndefined){
if(!isFrozen||!isArray(array)||!isFrozen(array))return!1
;for(var element,index=0,length=array.length;index<length;)if(!("string"==typeof(element=array[index++])||allowUndefined&&void 0===element))return!1
;return 0!==length};_export({target:"Array",
stat:!0},{isTemplateObject:function(value){
if(!isFrozenStringArray(value,!0))return!1
;var raw=value.raw
;return!(raw.length!==value.length||!isFrozenStringArray(raw,!1))
}})
;var AsyncIteratorPrototype,prototype,ASYNC_ITERATOR=wellKnownSymbol("asyncIterator"),AsyncIterator=global_1.AsyncIterator,PassedAsyncIteratorPrototype=sharedStore.AsyncIteratorPrototype
;if(PassedAsyncIteratorPrototype)AsyncIteratorPrototype=PassedAsyncIteratorPrototype;else if("function"==typeof AsyncIterator)AsyncIteratorPrototype=AsyncIterator.prototype;else if(sharedStore.USE_FUNCTION_CONSTRUCTOR||global_1.USE_FUNCTION_CONSTRUCTOR)try{
prototype=objectGetPrototypeOf(objectGetPrototypeOf(objectGetPrototypeOf(Function("return async function*(){}()")()))),
objectGetPrototypeOf(prototype)===Object.prototype&&(AsyncIteratorPrototype=prototype)
}catch(error){}
AsyncIteratorPrototype||(AsyncIteratorPrototype={}),has(AsyncIteratorPrototype,ASYNC_ITERATOR)||createNonEnumerableProperty(AsyncIteratorPrototype,ASYNC_ITERATOR,(function(){
return this}))
;var asyncIteratorPrototype=AsyncIteratorPrototype,TO_STRING_TAG$4=wellKnownSymbol("toStringTag"),AsyncIteratorConstructor=function(){
anInstance(this,AsyncIteratorConstructor)}
;AsyncIteratorConstructor.prototype=asyncIteratorPrototype,
has(asyncIteratorPrototype,TO_STRING_TAG$4)||createNonEnumerableProperty(asyncIteratorPrototype,TO_STRING_TAG$4,"AsyncIterator"),
has(asyncIteratorPrototype,"constructor")&&asyncIteratorPrototype.constructor!==Object||createNonEnumerableProperty(asyncIteratorPrototype,"constructor",AsyncIteratorConstructor),
_export({global:!0,forced:false},{
AsyncIterator:AsyncIteratorConstructor})
;var Promise$2=getBuiltIn("Promise"),setInternalState$f=internalState.set,getInternalState$b=internalState.get,TO_STRING_TAG$5=wellKnownSymbol("toStringTag"),$return=function(value){
var iterator=getInternalState$b(this).iterator,$$return=iterator.return
;return void 0===$$return?Promise$2.resolve({
done:!0,value:value
}):anObject($$return.call(iterator,value))
},$throw=function(value){
var iterator=getInternalState$b(this).iterator,$$throw=iterator.throw
;return void 0===$$throw?Promise$2.reject(value):$$throw.call(iterator,value)
},asyncIteratorCreateProxy=function(nextHandler,IS_ITERATOR){
var AsyncIteratorProxy=function(state){
state.next=aFunction$1(state.iterator.next),
state.done=!1,setInternalState$f(this,state)}
;return AsyncIteratorProxy.prototype=redefineAll(objectCreate(path.AsyncIterator.prototype),{
next:function(arg){
var state=getInternalState$b(this)
;if(state.done)return Promise$2.resolve({done:!0,
value:void 0});try{
return Promise$2.resolve(anObject(nextHandler.call(state,arg,Promise$2)))
}catch(error){return Promise$2.reject(error)}},
return:$return,throw:$throw
}),IS_ITERATOR||createNonEnumerableProperty(AsyncIteratorProxy.prototype,TO_STRING_TAG$5,"Generator"),
AsyncIteratorProxy
},AsyncIteratorProxy=asyncIteratorCreateProxy((function(arg,Promise){
var state=this,iterator=state.iterator
;return Promise.resolve(anObject(state.next.call(iterator,arg))).then((function(step){
return anObject(step).done?(state.done=!0,{
done:!0,value:void 0}):{done:!1,
value:[state.index++,step.value]}}))}));_export({
target:"AsyncIterator",proto:!0,real:!0},{
asIndexedPairs:function(){
return new AsyncIteratorProxy({
iterator:anObject(this),index:0})}})
;var AsyncIteratorProxy$1=asyncIteratorCreateProxy((function(arg,Promise){
var state=this
;return new Promise((function(resolve,reject){
var loop=function(){try{
Promise.resolve(anObject(state.next.call(state.iterator,state.remaining?void 0:arg))).then((function(step){
try{anObject(step).done?(state.done=!0,resolve({
done:!0,value:void 0
})):state.remaining?(state.remaining--,loop()):resolve({
done:!1,value:step.value})}catch(err){reject(err)}
}),reject)}catch(error){reject(error)}};loop()}))
}));_export({target:"AsyncIterator",proto:!0,
real:!0},{drop:function(limit){
return new AsyncIteratorProxy$1({
iterator:anObject(this),
remaining:toPositiveInteger(limit)})}})
;var Promise$3=getBuiltIn("Promise"),push$1=[].push,createMethod$7=function(TYPE){
var IS_TO_ARRAY=0==TYPE,IS_FOR_EACH=1==TYPE,IS_EVERY=2==TYPE,IS_SOME=3==TYPE
;return function(iterator,fn){anObject(iterator)
;var next=aFunction$1(iterator.next),array=IS_TO_ARRAY?[]:void 0
;return IS_TO_ARRAY||aFunction$1(fn),
new Promise$3((function(resolve,reject){
var loop=function(){try{
Promise$3.resolve(anObject(next.call(iterator))).then((function(step){
try{
if(anObject(step).done)resolve(IS_TO_ARRAY?array:!IS_SOME&&(IS_EVERY||void 0));else{
var value=step.value
;IS_TO_ARRAY?(push$1.call(array,value),loop()):Promise$3.resolve(fn(value)).then((function(result){
IS_FOR_EACH?loop():IS_EVERY?result?loop():resolve(!1):result?resolve(IS_SOME||value):loop()
}),reject)}}catch(err){reject(err)}}),reject)
}catch(error){reject(error)}};loop()}))}
},asyncIteratorIteration={
toArray:createMethod$7(0),
forEach:createMethod$7(1),every:createMethod$7(2),
some:createMethod$7(3),find:createMethod$7(4)
},$every$2=asyncIteratorIteration.every;_export({
target:"AsyncIterator",proto:!0,real:!0},{
every:function(fn){return $every$2(this,fn)}})
;var AsyncIteratorProxy$2=asyncIteratorCreateProxy((function(arg,Promise){
var state=this,filterer=state.filterer
;return new Promise((function(resolve,reject){
var loop=function(){try{
Promise.resolve(anObject(state.next.call(state.iterator,arg))).then((function(step){
try{if(anObject(step).done)state.done=!0,resolve({
done:!0,value:void 0});else{var value=step.value
;Promise.resolve(filterer(value)).then((function(selected){
selected?resolve({done:!1,value:value}):loop()
}),reject)}}catch(err){reject(err)}}),reject)
}catch(error){reject(error)}};loop()}))}))
;_export({target:"AsyncIterator",proto:!0,real:!0
},{filter:function(filterer){
return new AsyncIteratorProxy$2({
iterator:anObject(this),
filterer:aFunction$1(filterer)})}})
;var $find$2=asyncIteratorIteration.find;_export({
target:"AsyncIterator",proto:!0,real:!0},{
find:function(fn){return $find$2(this,fn)}})
;var ASYNC_ITERATOR$1=wellKnownSymbol("asyncIterator"),getAsyncIteratorMethod=function(it){
var method=it[ASYNC_ITERATOR$1]
;return void 0===method?getIteratorMethod(it):method
},AsyncIteratorProxy$3=asyncIteratorCreateProxy((function(arg,Promise){
var innerIterator,iteratorMethod,state=this,mapper=state.mapper
;return new Promise((function(resolve,reject){
var outerLoop=function(){try{
Promise.resolve(anObject(state.next.call(state.iterator,arg))).then((function(step){
try{anObject(step).done?(state.done=!0,resolve({
done:!0,value:void 0
})):Promise.resolve(mapper(step.value)).then((function(mapped){
try{
if(void 0!==(iteratorMethod=getAsyncIteratorMethod(mapped)))return state.innerIterator=innerIterator=anObject(iteratorMethod.call(mapped)),
state.innerNext=aFunction$1(innerIterator.next),
innerLoop()
;reject(TypeError(".flatMap callback should return an iterable object"))
}catch(error2){reject(error2)}}),reject)
}catch(error1){reject(error1)}}),reject)
}catch(error){reject(error)}
},innerLoop=function(){
if(innerIterator=state.innerIterator)try{
Promise.resolve(anObject(state.innerNext.call(innerIterator))).then((function(result){
try{
anObject(result).done?(state.innerIterator=state.innerNext=null,outerLoop()):resolve({
done:!1,value:result.value})}catch(error1){
reject(error1)}}),reject)}catch(error){
reject(error)}else outerLoop()};innerLoop()}))}))
;_export({target:"AsyncIterator",proto:!0,real:!0
},{flatMap:function(mapper){
return new AsyncIteratorProxy$3({
iterator:anObject(this),
mapper:aFunction$1(mapper),innerIterator:null,
innerNext:null})}})
;var $forEach$3=asyncIteratorIteration.forEach
;_export({target:"AsyncIterator",proto:!0,real:!0
},{forEach:function(fn){return $forEach$3(this,fn)
}})
;var AsyncIterator$1=path.AsyncIterator,AsyncIteratorProxy$4=asyncIteratorCreateProxy((function(arg){
return anObject(this.next.call(this.iterator,arg))
}),!0);_export({target:"AsyncIterator",stat:!0},{
from:function(O){
var iterator,object=toObject(O),usingIterator=getAsyncIteratorMethod(object)
;if(null!=usingIterator){
if((iterator=aFunction$1(usingIterator).call(object))instanceof AsyncIterator$1)return iterator
}else iterator=object
;return new AsyncIteratorProxy$4({
iterator:iterator})}})
;var AsyncIteratorProxy$5=asyncIteratorCreateProxy((function(arg,Promise){
var state=this,mapper=state.mapper
;return Promise.resolve(anObject(state.next.call(state.iterator,arg))).then((function(step){
return anObject(step).done?(state.done=!0,{
done:!0,value:void 0
}):Promise.resolve(mapper(step.value)).then((function(value){
return{done:!1,value:value}}))}))}));_export({
target:"AsyncIterator",proto:!0,real:!0},{
map:function(mapper){
return new AsyncIteratorProxy$5({
iterator:anObject(this),mapper:aFunction$1(mapper)
})}});var Promise$4=getBuiltIn("Promise")
;_export({target:"AsyncIterator",proto:!0,real:!0
},{reduce:function(reducer){
var iterator=anObject(this),next=aFunction$1(iterator.next),noInitial=arguments.length<2,accumulator=noInitial?void 0:arguments[1]
;return aFunction$1(reducer),
new Promise$4((function(resolve,reject){
var loop=function(){try{
Promise$4.resolve(anObject(next.call(iterator))).then((function(step){
try{
if(anObject(step).done)noInitial?reject(TypeError("Reduce of empty iterator with no initial value")):resolve(accumulator);else{
var value=step.value
;noInitial?(noInitial=!1,accumulator=value,loop()):Promise$4.resolve(reducer(accumulator,value)).then((function(result){
accumulator=result,loop()}),reject)}}catch(err){
reject(err)}}),reject)}catch(error){reject(error)}
};loop()}))}})
;var $some$2=asyncIteratorIteration.some;_export({
target:"AsyncIterator",proto:!0,real:!0},{
some:function(fn){return $some$2(this,fn)}})
;var AsyncIteratorProxy$6=asyncIteratorCreateProxy((function(arg){
return this.remaining--?this.next.call(this.iterator,arg):(this.done=!0,
{done:!0,value:void 0})}));_export({
target:"AsyncIterator",proto:!0,real:!0},{
take:function(limit){
return new AsyncIteratorProxy$6({
iterator:anObject(this),
remaining:toPositiveInteger(limit)})}})
;var $toArray=asyncIteratorIteration.toArray
;_export({target:"AsyncIterator",proto:!0,real:!0
},{toArray:function(){return $toArray(this)}})
;var IteratorPrototype$3=iteratorsCore.IteratorPrototype,TO_STRING_TAG$6=(wellKnownSymbol("iterator"),
wellKnownSymbol("toStringTag")),NativeIterator=global_1.Iterator,FORCED$l="function"!=typeof NativeIterator||NativeIterator.prototype!==IteratorPrototype$3||!fails((function(){
NativeIterator({})
})),IteratorConstructor=function(){
anInstance(this,IteratorConstructor)}
;has(IteratorPrototype$3,TO_STRING_TAG$6)||createNonEnumerableProperty(IteratorPrototype$3,TO_STRING_TAG$6,"Iterator"),
!FORCED$l&&has(IteratorPrototype$3,"constructor")&&IteratorPrototype$3.constructor!==Object||createNonEnumerableProperty(IteratorPrototype$3,"constructor",IteratorConstructor),
IteratorConstructor.prototype=IteratorPrototype$3,
_export({global:!0,forced:FORCED$l},{
Iterator:IteratorConstructor})
;var setInternalState$g=internalState.set,getInternalState$c=internalState.get,TO_STRING_TAG$7=wellKnownSymbol("toStringTag"),$return$1=function(value){
var iterator=getInternalState$c(this).iterator,$$return=iterator.return
;return void 0===$$return?{done:!0,value:value
}:anObject($$return.call(iterator,value))
},$throw$1=function(value){
var iterator=getInternalState$c(this).iterator,$$throw=iterator.throw
;if(void 0===$$throw)throw value
;return $$throw.call(iterator,value)
},iteratorCreateProxy=function(nextHandler,IS_ITERATOR){
var IteratorProxy=function(state){
state.next=aFunction$1(state.iterator.next),state.done=!1,
setInternalState$g(this,state)}
;return IteratorProxy.prototype=redefineAll(objectCreate(path.Iterator.prototype),{
next:function(){
var state=getInternalState$c(this),result=state.done?void 0:nextHandler.apply(state,arguments)
;return{done:state.done,value:result}},
return:$return$1,throw:$throw$1
}),IS_ITERATOR||createNonEnumerableProperty(IteratorProxy.prototype,TO_STRING_TAG$7,"Generator"),
IteratorProxy
},IteratorProxy=iteratorCreateProxy((function(arg){
var result=anObject(this.next.call(this.iterator,arg))
;if(!(this.done=!!result.done))return[this.index++,result.value]
}));_export({target:"Iterator",proto:!0,real:!0},{
asIndexedPairs:function(){
return new IteratorProxy({iterator:anObject(this),
index:0})}})
;var IteratorProxy$1=iteratorCreateProxy((function(arg){
for(var result,iterator=this.iterator,next=this.next;this.remaining;)if(this.remaining--,
result=anObject(next.call(iterator)),
this.done=!!result.done)return
;if(result=anObject(next.call(iterator,arg)),!(this.done=!!result.done))return result.value
}));_export({target:"Iterator",proto:!0,real:!0},{
drop:function(limit){return new IteratorProxy$1({
iterator:anObject(this),
remaining:toPositiveInteger(limit)})}}),_export({
target:"Iterator",proto:!0,real:!0},{
every:function(fn){
return anObject(this),aFunction$1(fn),!iterate_1(this,(function(value){
if(!fn(value))return iterate_1.stop()
}),void 0,!1,!0).stopped}})
;var IteratorProxy$2=iteratorCreateProxy((function(arg){
for(var result,value,iterator=this.iterator,filterer=this.filterer,next=this.next;;){
if(result=anObject(next.call(iterator,arg)),
this.done=!!result.done)return
;if(value=result.value,callWithSafeIterationClosing(iterator,filterer,value))return value
}}));_export({target:"Iterator",proto:!0,real:!0
},{filter:function(filterer){
return new IteratorProxy$2({
iterator:anObject(this),
filterer:aFunction$1(filterer)})}}),_export({
target:"Iterator",proto:!0,real:!0},{
find:function(fn){
return anObject(this),aFunction$1(fn),iterate_1(this,(function(value){
if(fn(value))return iterate_1.stop(value)
}),void 0,!1,!0).result}})
;var IteratorProxy$3=iteratorCreateProxy((function(arg){
for(var result,mapped,iteratorMethod,innerIterator,iterator=this.iterator;;){
if(innerIterator=this.innerIterator){
if(!(result=anObject(this.innerNext.call(innerIterator))).done)return result.value
;this.innerIterator=this.innerNext=null}
if(result=anObject(this.next.call(iterator,arg)),
this.done=!!result.done)return
;if(mapped=callWithSafeIterationClosing(iterator,this.mapper,result.value),
void 0===(iteratorMethod=getIteratorMethod(mapped)))throw TypeError(".flatMap callback should return an iterable object")
;this.innerIterator=innerIterator=anObject(iteratorMethod.call(mapped)),
this.innerNext=aFunction$1(innerIterator.next)}}))
;_export({target:"Iterator",proto:!0,real:!0},{
flatMap:function(mapper){
return new IteratorProxy$3({
iterator:anObject(this),
mapper:aFunction$1(mapper),innerIterator:null,
innerNext:null})}}),_export({target:"Iterator",
proto:!0,real:!0},{forEach:function(fn){
iterate_1(anObject(this),fn,void 0,!1,!0)}})
;var Iterator=path.Iterator,IteratorProxy$4=iteratorCreateProxy((function(arg){
var result=anObject(this.next.call(this.iterator,arg))
;if(!(this.done=!!result.done))return result.value
}),!0);_export({target:"Iterator",stat:!0},{
from:function(O){
var iterator,object=toObject(O),usingIterator=getIteratorMethod(object)
;if(null!=usingIterator){
if((iterator=aFunction$1(usingIterator).call(object))instanceof Iterator)return iterator
}else iterator=object;return new IteratorProxy$4({
iterator:iterator})}})
;var IteratorProxy$5=iteratorCreateProxy((function(arg){
var iterator=this.iterator,result=anObject(this.next.call(iterator,arg))
;if(!(this.done=!!result.done))return callWithSafeIterationClosing(iterator,this.mapper,result.value)
}));_export({target:"Iterator",proto:!0,real:!0},{
map:function(mapper){return new IteratorProxy$5({
iterator:anObject(this),mapper:aFunction$1(mapper)
})}}),_export({target:"Iterator",proto:!0,real:!0
},{reduce:function(reducer){
anObject(this),aFunction$1(reducer)
;var noInitial=arguments.length<2,accumulator=noInitial?void 0:arguments[1]
;if(iterate_1(this,(function(value){
noInitial?(noInitial=!1,accumulator=value):accumulator=reducer(accumulator,value)
}),void 0,!1,!0),
noInitial)throw TypeError("Reduce of empty iterator with no initial value")
;return accumulator}}),_export({target:"Iterator",
proto:!0,real:!0},{some:function(fn){
return anObject(this),aFunction$1(fn),iterate_1(this,(function(value){
if(fn(value))return iterate_1.stop()
}),void 0,!1,!0).stopped}})
;var IteratorProxy$6=iteratorCreateProxy((function(arg){
if(this.remaining--){
var result=anObject(this.next.call(this.iterator,arg))
;return(this.done=!!result.done)?void 0:result.value
}this.done=!0}));_export({target:"Iterator",
proto:!0,real:!0},{take:function(limit){
return new IteratorProxy$6({
iterator:anObject(this),
remaining:toPositiveInteger(limit)})}})
;var push$2=[].push;_export({target:"Iterator",
proto:!0,real:!0},{toArray:function(){
var result=[]
;return iterate_1(anObject(this),push$2,result,!1,!0),result
}});var mapUpsert=function(key,updateFn){
var value,map=anObject(this),insertFn=arguments.length>2?arguments[2]:void 0
;if("function"!=typeof updateFn&&"function"!=typeof insertFn)throw TypeError("At least one callback required")
;return map.has(key)?(value=map.get(key),
"function"==typeof updateFn&&(value=updateFn(value),
map.set(key,value))):"function"==typeof insertFn&&(value=insertFn(),
map.set(key,value)),value};_export({target:"Map",
proto:!0,real:!0,forced:false},{
updateOrInsert:mapUpsert}),_export({target:"Map",
proto:!0,real:!0,forced:false},{upsert:mapUpsert
}),_export({target:"WeakMap",proto:!0,real:!0,
forced:false},{upsert:mapUpsert}),_export({
target:"Set",proto:!0,real:!0,forced:false},{
difference:function(iterable){
var set=anObject(this),newSet=new(speciesConstructor(set,getBuiltIn("Set")))(set),remover=aFunction$1(newSet.delete)
;return iterate_1(iterable,(function(value){
remover.call(newSet,value)})),newSet}}),_export({
target:"Set",proto:!0,real:!0,forced:false},{
intersection:function(iterable){
var set=anObject(this),newSet=new(speciesConstructor(set,getBuiltIn("Set"))),hasCheck=aFunction$1(set.has),adder=aFunction$1(newSet.add)
;return iterate_1(iterable,(function(value){
hasCheck.call(set,value)&&adder.call(newSet,value)
})),newSet}}),_export({target:"Set",proto:!0,
real:!0,forced:false},{
isDisjointFrom:function(iterable){
var set=anObject(this),hasCheck=aFunction$1(set.has)
;return!iterate_1(iterable,(function(value){
if(!0===hasCheck.call(set,value))return iterate_1.stop()
})).stopped}}),_export({target:"Set",proto:!0,
real:!0,forced:false},{
isSubsetOf:function(iterable){
var iterator=getIterator(this),otherSet=anObject(iterable),hasCheck=otherSet.has
;return"function"!=typeof hasCheck&&(otherSet=new(getBuiltIn("Set"))(iterable),
hasCheck=aFunction$1(otherSet.has)),
!iterate_1(iterator,(function(value){
if(!1===hasCheck.call(otherSet,value))return iterate_1.stop()
}),void 0,!1,!0).stopped}}),_export({target:"Set",
proto:!0,real:!0,forced:false},{
isSupersetOf:function(iterable){
var set=anObject(this),hasCheck=aFunction$1(set.has)
;return!iterate_1(iterable,(function(value){
if(!1===hasCheck.call(set,value))return iterate_1.stop()
})).stopped}}),_export({target:"Set",proto:!0,
real:!0,forced:false},{union:function(iterable){
var set=anObject(this),newSet=new(speciesConstructor(set,getBuiltIn("Set")))(set)
;return iterate_1(iterable,aFunction$1(newSet.add),newSet),
newSet}}),_export({target:"Set",proto:!0,real:!0,
forced:false},{
symmetricDifference:function(iterable){
var set=anObject(this),newSet=new(speciesConstructor(set,getBuiltIn("Set")))(set),remover=aFunction$1(newSet.delete),adder=aFunction$1(newSet.add)
;return iterate_1(iterable,(function(value){
remover.call(newSet,value)||adder.call(newSet,value)
})),newSet}
}),defineWellKnownSymbol("asyncDispose"),defineWellKnownSymbol("dispose")
;var setInternalState$h=internalState.set,getInternalAggregateErrorState=internalState.getterFor("AggregateError"),$AggregateError=function(errors,message){
var that=this
;if(!(that instanceof $AggregateError))return new $AggregateError(errors,message)
;objectSetPrototypeOf&&(that=objectSetPrototypeOf(new Error(message),objectGetPrototypeOf(that)))
;var errorsArray=[]
;return iterate_1(errors,errorsArray.push,errorsArray),descriptors?setInternalState$h(that,{
errors:errorsArray,type:"AggregateError"
}):that.errors=errorsArray,void 0!==message&&createNonEnumerableProperty(that,"message",String(message)),
that}
;$AggregateError.prototype=objectCreate(Error.prototype,{
constructor:createPropertyDescriptor(5,$AggregateError),
message:createPropertyDescriptor(5,""),
name:createPropertyDescriptor(5,"AggregateError")
}),descriptors&&objectDefineProperty.f($AggregateError.prototype,"errors",{
get:function(){
return getInternalAggregateErrorState(this).errors
},configurable:!0}),_export({global:!0},{
AggregateError:$AggregateError});_export({
target:"Promise",stat:!0},{any:function(iterable){
var C=this,capability=newPromiseCapability.f(C),resolve=capability.resolve,reject=capability.reject,result=perform((function(){
var promiseResolve=aFunction$1(C.resolve),errors=[],counter=0,remaining=1,alreadyResolved=!1
;iterate_1(iterable,(function(promise){
var index=counter++,alreadyRejected=!1
;errors.push(void 0),remaining++,promiseResolve.call(C,promise).then((function(value){
alreadyRejected||alreadyResolved||(alreadyResolved=!0,
resolve(value))}),(function(e){
alreadyRejected||alreadyResolved||(alreadyRejected=!0,
errors[index]=e,--remaining||reject(new(getBuiltIn("AggregateError"))(errors,"No one promise resolved")))
}))
})),--remaining||reject(new(getBuiltIn("AggregateError"))(errors,"No one promise resolved"))
}))
;return result.error&&reject(result.value),capability.promise
}})
;var REPLACE$1=wellKnownSymbol("replace"),RegExpPrototype$4=RegExp.prototype
;_export({target:"String",proto:!0},{
replaceAll:function replaceAll(searchValue,replaceValue){
var replacer,string,searchString,template,result,position,index,O=requireObjectCoercible(this)
;if(null!=searchValue){
if(isRegexp(searchValue)&&!~String(requireObjectCoercible("flags"in RegExpPrototype$4?searchValue.flags:regexpFlags.call(searchValue))).indexOf("g"))throw TypeError("`.replaceAll` does not allow non-global regexes")
;if(void 0!==(replacer=searchValue[REPLACE$1]))return replacer.call(searchValue,O,replaceValue)
}
if(string=String(O),""===(searchString=String(searchValue)))return replaceAll.call(string,/(?:)/g,replaceValue)
;if(template=string.split(searchString),
"function"!=typeof replaceValue)return template.join(String(replaceValue))
;for(position=(result=template[0]).length,
index=1;index<template.length;index++)result+=String(replaceValue(searchString,position,string)),
position+=searchString.length+template[index].length,
result+=template[index];return result}
}),defineWellKnownSymbol("replaceAll")
;var domIterables={CSSRuleList:0,
CSSStyleDeclaration:0,CSSValueList:0,
ClientRectList:0,DOMRectList:0,DOMStringList:0,
DOMTokenList:1,DataTransferItemList:0,FileList:0,
HTMLAllCollection:0,HTMLCollection:0,
HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,
MimeTypeArray:0,NamedNodeMap:0,NodeList:1,
PaintRequestList:0,Plugin:0,PluginArray:0,
SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,
SVGPointList:0,SVGStringList:0,SVGTransformList:0,
SourceBufferList:0,StyleSheetList:0,
TextTrackCueList:0,TextTrackList:0,TouchList:0}
;for(var COLLECTION_NAME in domIterables){
var Collection=global_1[COLLECTION_NAME],CollectionPrototype=Collection&&Collection.prototype
;if(CollectionPrototype&&CollectionPrototype.forEach!==arrayForEach)try{
createNonEnumerableProperty(CollectionPrototype,"forEach",arrayForEach)
}catch(error){
CollectionPrototype.forEach=arrayForEach}}
var ITERATOR$9=wellKnownSymbol("iterator"),TO_STRING_TAG$8=wellKnownSymbol("toStringTag"),ArrayValues=es_array_iterator.values
;for(var COLLECTION_NAME$1 in domIterables){
var Collection$1=global_1[COLLECTION_NAME$1],CollectionPrototype$1=Collection$1&&Collection$1.prototype
;if(CollectionPrototype$1){
if(CollectionPrototype$1[ITERATOR$9]!==ArrayValues)try{
createNonEnumerableProperty(CollectionPrototype$1,ITERATOR$9,ArrayValues)
}catch(error){
CollectionPrototype$1[ITERATOR$9]=ArrayValues}
if(CollectionPrototype$1[TO_STRING_TAG$8]||createNonEnumerableProperty(CollectionPrototype$1,TO_STRING_TAG$8,COLLECTION_NAME$1),
domIterables[COLLECTION_NAME$1])for(var METHOD_NAME in es_array_iterator)if(CollectionPrototype$1[METHOD_NAME]!==es_array_iterator[METHOD_NAME])try{
createNonEnumerableProperty(CollectionPrototype$1,METHOD_NAME,es_array_iterator[METHOD_NAME])
}catch(error){
CollectionPrototype$1[METHOD_NAME]=es_array_iterator[METHOD_NAME]
}}}
var FORCED$m=!global_1.setImmediate||!global_1.clearImmediate
;_export({global:!0,bind:!0,enumerable:!0,
forced:FORCED$m},{setImmediate:task.set,
clearImmediate:task.clear})
;var process$4=global_1.process,isNode="process"==classofRaw(process$4)
;_export({global:!0,enumerable:!0,noTargetGet:!0
},{queueMicrotask:function(fn){
var domain=isNode&&process$4.domain
;microtask(domain?domain.bind(fn):fn)}})
;var slice$1=[].slice,MSIE=/MSIE .\./.test(engineUserAgent),wrap$1=function(scheduler){
return function(handler,timeout){
var boundArgs=arguments.length>2,args=boundArgs?slice$1.call(arguments,2):void 0
;return scheduler(boundArgs?function(){
("function"==typeof handler?handler:Function(handler)).apply(this,args)
}:handler,timeout)}}
;function _defineProperties(target,props){
for(var i=0;i<props.length;i++){
var descriptor=props[i]
;descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,
"value"in descriptor&&(descriptor.writable=!0),
Object.defineProperty(target,descriptor.key,descriptor)
}}
function _createClass(Constructor,protoProps,staticProps){
return protoProps&&_defineProperties(Constructor.prototype,protoProps),
staticProps&&_defineProperties(Constructor,staticProps),
Constructor}function _getPrototypeOf(o){
return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(o){
return o.__proto__||Object.getPrototypeOf(o)})(o)}
function _get(target,property,receiver){
return(_get="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(target,property,receiver){
var base=function(object,property){
for(;!Object.prototype.hasOwnProperty.call(object,property)&&null!==(object=_getPrototypeOf(object)););
return object}(target,property);if(base){
var desc=Object.getOwnPropertyDescriptor(base,property)
;return desc.get?desc.get.call(receiver):desc.value
}})(target,property,receiver||target)}
function _classCallCheck(instance,Constructor){
if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")
}function _assertThisInitialized(self){
if(void 0===self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
;return self}function _setPrototypeOf(o,p){
return(_setPrototypeOf=Object.setPrototypeOf||function(o,p){
return o.__proto__=p,o})(o,p)}
function _inherits(subClass,superClass){
if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function")
;subClass.prototype=Object.create(superClass&&superClass.prototype,{
constructor:{value:subClass,writable:!0,
configurable:!0}
}),superClass&&_setPrototypeOf(subClass,superClass)
}function _typeof(obj){
return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){
return typeof obj}:function(obj){
return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj
})(obj)}
function _possibleConstructorReturn(self,call){
return!call||"object"!==_typeof(call)&&"function"!=typeof call?_assertThisInitialized(self):call
}function _isNativeReflectConstruct(){
if("undefined"==typeof Reflect||!Reflect.construct)return!1
;if(Reflect.construct.sham)return!1
;if("function"==typeof Proxy)return!0;try{
return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),
!0}catch(e){return!1}}
function _construct(Parent,args,Class){
return(_construct=_isNativeReflectConstruct()?Reflect.construct:function(Parent,args,Class){
var a=[null];a.push.apply(a,args)
;var instance=new(Function.bind.apply(Parent,a))
;return Class&&_setPrototypeOf(instance,Class.prototype),
instance}).apply(null,arguments)}
function _wrapNativeSuper(Class){
var _cache="function"==typeof Map?new Map:void 0
;return(_wrapNativeSuper=function(Class){
if(null===Class||(fn=Class,-1===Function.toString.call(fn).indexOf("[native code]")))return Class
;var fn
;if("function"!=typeof Class)throw new TypeError("Super expression must either be null or a function")
;if(void 0!==_cache){
if(_cache.has(Class))return _cache.get(Class)
;_cache.set(Class,Wrapper)}function Wrapper(){
return _construct(Class,arguments,_getPrototypeOf(this).constructor)
}
return Wrapper.prototype=Object.create(Class.prototype,{
constructor:{value:Wrapper,enumerable:!1,
writable:!0,configurable:!0}
}),_setPrototypeOf(Wrapper,Class)})(Class)}
function _createSuper(Derived){
var hasNativeReflectConstruct=function(){
if("undefined"==typeof Reflect||!Reflect.construct)return!1
;if(Reflect.construct.sham)return!1
;if("function"==typeof Proxy)return!0;try{
return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),
!0}catch(e){return!1}}();return function(){
var result,Super=_getPrototypeOf(Derived)
;if(hasNativeReflectConstruct){
var NewTarget=_getPrototypeOf(this).constructor
;result=Reflect.construct(Super,arguments,NewTarget)
}else result=Super.apply(this,arguments)
;return _possibleConstructorReturn(this,result)}}
function _createSuper$1(Derived){
var hasNativeReflectConstruct=function(){
if("undefined"==typeof Reflect||!Reflect.construct)return!1
;if(Reflect.construct.sham)return!1
;if("function"==typeof Proxy)return!0;try{
return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),
!0}catch(e){return!1}}();return function(){
var result,Super=_getPrototypeOf(Derived)
;if(hasNativeReflectConstruct){
var NewTarget=_getPrototypeOf(this).constructor
;result=Reflect.construct(Super,arguments,NewTarget)
}else result=Super.apply(this,arguments)
;return _possibleConstructorReturn(this,result)}}
_export({global:!0,bind:!0,forced:MSIE},{
setTimeout:wrap$1(global_1.setTimeout),
setInterval:wrap$1(global_1.setInterval)
}),function(){
if(!("onunhandledrejection"in window)){
var global=window,NativePromise=global.Promise,__PromiseIsHandled__=Symbol("[[PromiseIsHandled]]"),__Rejected__=Symbol("[[Rejected]]"),__PromiseResult__=Symbol("[[PromiseResult]]"),PromiseRejectionEvent=function(_Event){
_inherits(PromiseRejectionEvent,_Event)
;var _super=_createSuper(PromiseRejectionEvent)
;function PromiseRejectionEvent(type,parameters){
var _this
;return _classCallCheck(this,PromiseRejectionEvent),_this=_super.call(this,type,{
cancelable:!0
}),Object.defineProperties(_assertThisInitialized(_this),{
promise:{value:parameters.promise,enumerable:!0},
reason:{value:parameters.reason,enumerable:!0}
}),_this}return PromiseRejectionEvent
}(_wrapNativeSuper(Event)),blockRecursion=!1,Promise=function(_NativePromise){
_inherits(Promise,_NativePromise)
;var _super2=_createSuper(Promise)
;function Promise(callback){var _thisSuper,_this2
;return _classCallCheck(this,Promise),
_this2=_super2.call(this,callback),blockRecursion||(blockRecursion=!0,
_this2[__PromiseIsHandled__]=!1,
_this2[__Rejected__]=!1,_get((_thisSuper=_assertThisInitialized(_this2),
_getPrototypeOf(Promise.prototype)),"then",_thisSuper).call(_thisSuper,null,(function(reason){
_this2[__PromiseIsHandled__]||(_this2[__PromiseResult__]=reason,
_this2[__Rejected__]=!0,
dispatchPromiseEvent("unhandledrejection",_assertThisInitialized(_this2),reason))
})),
blockRecursion=!1),_possibleConstructorReturn(_this2,_assertThisInitialized(_this2))
}return _createClass(Promise,[{key:"then",
value:function(onResolve,onReject){
return this[__Rejected__]&&!this[__PromiseIsHandled__]&&dispatchPromiseEvent("rejectionhandled",this,this[__PromiseResult__]),
this[__PromiseIsHandled__]=!0,
_get(_getPrototypeOf(Promise.prototype),"then",this).call(this,onResolve,onReject)
}},{key:"catch",value:function(onReject){
return this.then(null,onReject)}}]),Promise
}(NativePromise)
;global.addEventListener("unhandledrejection",(function(event){
console.error("Uncaught (in promise)",event.reason)
})),global.Promise=Promise,global.PromiseRejectionEvent=PromiseRejectionEvent,
global.onunhandledrejection=null,
global.onrejectionhandled=null}
function dispatchPromiseEvent(type,promise,reason){
var event=new PromiseRejectionEvent(type,{
promise:promise,reason:reason
}),propertyVersion="on"+type
;global.dispatchEvent(event),global[propertyVersion]&&setTimeout((function(){
"function"==typeof global[propertyVersion]&&global[propertyVersion](event)
}))}
}(),window.Map=Map,window.Array.from=Array.from,function(exports){
if(!exports.fetch){
var support_searchParams="URLSearchParams"in self,support_iterable="Symbol"in self&&"iterator"in Symbol,support_blob="FileReader"in self&&"Blob"in self&&function(){
try{return new Blob,!0}catch(e){return!1}
}(),support_formData="FormData"in self,support_arrayBuffer="ArrayBuffer"in self
;if(support_arrayBuffer)var viewClasses=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],isArrayBufferView=ArrayBuffer.isView||function(obj){
return obj&&viewClasses.indexOf(Object.prototype.toString.call(obj))>-1
};Headers.prototype.append=function(name,value){
name=normalizeName(name),value=normalizeValue(value)
;var oldValue=this.map[name]
;this.map[name]=oldValue?oldValue+", "+value:value
},Headers.prototype.delete=function(name){
delete this.map[normalizeName(name)]
},Headers.prototype.get=function(name){
return name=normalizeName(name),this.has(name)?this.map[name]:null
},Headers.prototype.has=function(name){
return this.map.hasOwnProperty(normalizeName(name))
},Headers.prototype.set=function(name,value){
this.map[normalizeName(name)]=normalizeValue(value)
},Headers.prototype.forEach=function(callback,thisArg){
for(var name in this.map)this.map.hasOwnProperty(name)&&callback.call(thisArg,this.map[name],name,this)
},Headers.prototype.keys=function(){var items=[]
;return this.forEach((function(value,name){
items.push(name)})),iteratorFor(items)
},Headers.prototype.values=function(){var items=[]
;return this.forEach((function(value){
items.push(value)})),iteratorFor(items)
},Headers.prototype.entries=function(){
var items=[]
;return this.forEach((function(value,name){
items.push([name,value])})),iteratorFor(items)
},support_iterable&&(Headers.prototype[Symbol.iterator]=Headers.prototype.entries)
;var methods=["DELETE","GET","HEAD","OPTIONS","POST","PUT"]
;Request.prototype.clone=function(){
return new Request(this,{body:this._bodyInit})
},Body.call(Request.prototype),Body.call(Response.prototype),
Response.prototype.clone=function(){
return new Response(this._bodyInit,{
status:this.status,statusText:this.statusText,
headers:new Headers(this.headers),url:this.url})
},Response.error=function(){
var response=new Response(null,{status:0,
statusText:""})
;return response.type="error",response}
;var redirectStatuses=[301,302,303,307,308]
;Response.redirect=function(url,status){
if(-1===redirectStatuses.indexOf(status))throw new RangeError("Invalid status code")
;return new Response(null,{status:status,headers:{
location:url}})
},exports.DOMException=self.DOMException;try{
new exports.DOMException}catch(err){
exports.DOMException=function(message,name){
this.message=message,this.name=name
;var error=Error(message);this.stack=error.stack
},exports.DOMException.prototype=Object.create(Error.prototype),
exports.DOMException.prototype.constructor=exports.DOMException
}
return fetch.polyfill=!0,self.fetch||(self.fetch=fetch,self.Headers=Headers,self.Request=Request,
self.Response=Response),
exports.Headers=Headers,exports.Request=Request,exports.Response=Response,
exports.fetch=fetch,exports}
function normalizeName(name){
if("string"!=typeof name&&(name=String(name)),/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(name))throw new TypeError("Invalid character in header field name")
;return name.toLowerCase()}
function normalizeValue(value){
return"string"!=typeof value&&(value=String(value)),
value}function iteratorFor(items){var iterator={
next:function(){var value=items.shift();return{
done:void 0===value,value:value}}}
;return support_iterable&&(iterator[Symbol.iterator]=function(){
return iterator}),iterator}
function Headers(headers){
this.map={},headers instanceof Headers?headers.forEach((function(value,name){
this.append(name,value)
}),this):Array.isArray(headers)?headers.forEach((function(header){
this.append(header[0],header[1])
}),this):headers&&Object.getOwnPropertyNames(headers).forEach((function(name){
this.append(name,headers[name])}),this)}
function consumed(body){
if(body.bodyUsed)return Promise.reject(new TypeError("Already read"))
;body.bodyUsed=!0}
function fileReaderReady(reader){
return new Promise((function(resolve,reject){
reader.onload=function(){resolve(reader.result)
},reader.onerror=function(){reject(reader.error)}
}))}function readBlobAsArrayBuffer(blob){
var reader=new FileReader,promise=fileReaderReady(reader)
;return reader.readAsArrayBuffer(blob),promise}
function bufferClone(buf){
if(buf.slice)return buf.slice(0)
;var view=new Uint8Array(buf.byteLength)
;return view.set(new Uint8Array(buf)),view.buffer}
function Body(){
return this.bodyUsed=!1,this._initBody=function(body){
var obj
;this._bodyInit=body,body?"string"==typeof body?this._bodyText=body:support_blob&&Blob.prototype.isPrototypeOf(body)?this._bodyBlob=body:support_formData&&FormData.prototype.isPrototypeOf(body)?this._bodyFormData=body:support_searchParams&&URLSearchParams.prototype.isPrototypeOf(body)?this._bodyText=body.toString():support_arrayBuffer&&support_blob&&((obj=body)&&DataView.prototype.isPrototypeOf(obj))?(this._bodyArrayBuffer=bufferClone(body.buffer),
this._bodyInit=new Blob([this._bodyArrayBuffer])):support_arrayBuffer&&(ArrayBuffer.prototype.isPrototypeOf(body)||isArrayBufferView(body))?this._bodyArrayBuffer=bufferClone(body):this._bodyText=body=Object.prototype.toString.call(body):this._bodyText="",
this.headers.get("content-type")||("string"==typeof body?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):support_searchParams&&URLSearchParams.prototype.isPrototypeOf(body)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))
},support_blob&&(this.blob=function(){
var rejected=consumed(this)
;if(rejected)return rejected
;if(this._bodyBlob)return Promise.resolve(this._bodyBlob)
;if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]))
;if(this._bodyFormData)throw new Error("could not read FormData body as blob")
;return Promise.resolve(new Blob([this._bodyText]))
},this.arrayBuffer=function(){
return this._bodyArrayBuffer?consumed(this)||Promise.resolve(this._bodyArrayBuffer):this.blob().then(readBlobAsArrayBuffer)
}),this.text=function(){
var rejected=consumed(this)
;if(rejected)return rejected
;if(this._bodyBlob)return function(blob){
var reader=new FileReader,promise=fileReaderReady(reader)
;return reader.readAsText(blob),promise
}(this._bodyBlob)
;if(this._bodyArrayBuffer)return Promise.resolve(function(buf){
for(var view=new Uint8Array(buf),chars=new Array(view.length),i=0;i<view.length;i++)chars[i]=String.fromCharCode(view[i])
;return chars.join("")}(this._bodyArrayBuffer))
;if(this._bodyFormData)throw new Error("could not read FormData body as text")
;return Promise.resolve(this._bodyText)
},support_formData&&(this.formData=function(){
return this.text().then(decode)
}),this.json=function(){
return this.text().then(JSON.parse)},this}
function Request(input,options){
var method,upcased,body=(options=options||{}).body
;if(input instanceof Request){
if(input.bodyUsed)throw new TypeError("Already read")
;this.url=input.url,this.credentials=input.credentials,
options.headers||(this.headers=new Headers(input.headers)),
this.method=input.method,
this.mode=input.mode,this.signal=input.signal,body||null==input._bodyInit||(body=input._bodyInit,
input.bodyUsed=!0)}else this.url=String(input)
;if(this.credentials=options.credentials||this.credentials||"same-origin",
!options.headers&&this.headers||(this.headers=new Headers(options.headers)),
this.method=(method=options.method||this.method||"GET",
upcased=method.toUpperCase(),
methods.indexOf(upcased)>-1?upcased:method),this.mode=options.mode||this.mode||null,
this.signal=options.signal||this.signal,
this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&body)throw new TypeError("Body not allowed for GET or HEAD requests")
;this._initBody(body)}function decode(body){
var form=new FormData
;return body.trim().split("&").forEach((function(bytes){
if(bytes){
var split=bytes.split("="),name=split.shift().replace(/\+/g," "),value=split.join("=").replace(/\+/g," ")
;form.append(decodeURIComponent(name),decodeURIComponent(value))
}})),form}function Response(bodyInit,options){
options||(options={}),this.type="default",
this.status=void 0===options.status?200:options.status,
this.ok=this.status>=200&&this.status<300,
this.statusText="statusText"in options?options.statusText:"OK",
this.headers=new Headers(options.headers),
this.url=options.url||"",this._initBody(bodyInit)}
function fetch(input,init){
return new Promise((function(resolve,reject){
var request=new Request(input,init)
;if(request.signal&&request.signal.aborted)return reject(new exports.DOMException("Aborted","AbortError"))
;var xhr=new XMLHttpRequest;function abortXhr(){
xhr.abort()}xhr.onload=function(){
var rawHeaders,headers,options={status:xhr.status,
statusText:xhr.statusText,
headers:(rawHeaders=xhr.getAllResponseHeaders()||"",headers=new Headers,
rawHeaders.replace(/\r?\n[\t ]+/g," ").split(/\r?\n/).forEach((function(line){
var parts=line.split(":"),key=parts.shift().trim()
;if(key){var value=parts.join(":").trim()
;headers.append(key,value)}})),headers)}
;options.url="responseURL"in xhr?xhr.responseURL:options.headers.get("X-Request-URL")
;var body="response"in xhr?xhr.response:xhr.responseText
;resolve(new Response(body,options))
},xhr.onerror=function(){
reject(new TypeError("Network request failed"))
},xhr.ontimeout=function(){
reject(new TypeError("Network request failed"))
},xhr.onabort=function(){
reject(new exports.DOMException("Aborted","AbortError"))
},xhr.open(request.method,request.url,!0),
"include"===request.credentials?xhr.withCredentials=!0:"omit"===request.credentials&&(xhr.withCredentials=!1),
"responseType"in xhr&&support_blob&&(xhr.responseType="blob"),
request.headers.forEach((function(value,name){
xhr.setRequestHeader(name,value)
})),request.signal&&(request.signal.addEventListener("abort",abortXhr),
xhr.onreadystatechange=function(){
4===xhr.readyState&&request.signal.removeEventListener("abort",abortXhr)
}),xhr.send(void 0===request._bodyInit?null:request._bodyInit)
}))}}(window);var Emitter=function(){
function Emitter(){
_classCallCheck(this,Emitter),Object.defineProperty(this,"listeners",{
value:{},writable:!0,configurable:!0})}
return _createClass(Emitter,[{
key:"addEventListener",
value:function(type,callback){
type in this.listeners||(this.listeners[type]=[]),
this.listeners[type].push(callback)}},{
key:"removeEventListener",
value:function(type,callback){
if(type in this.listeners)for(var stack=this.listeners[type],i=0,l=stack.length;i<l;i++)if(stack[i]===callback)return void stack.splice(i,1)
}},{key:"dispatchEvent",value:function(event){
var _this=this;if(event.type in this.listeners){
for(var debounce=function(callback){
setTimeout((function(){
return callback.call(_this,event)}))
},stack=this.listeners[event.type],i=0,l=stack.length;i<l;i++)debounce(stack[i])
;return!event.defaultPrevented}}}]),Emitter
}(),AbortSignal=function(_Emitter){
_inherits(AbortSignal,_Emitter)
;var _super=_createSuper$1(AbortSignal)
;function AbortSignal(){var _this2
;return _classCallCheck(this,AbortSignal),(_this2=_super.call(this)).listeners||Emitter.call(_assertThisInitialized(_this2)),
Object.defineProperty(_assertThisInitialized(_this2),"aborted",{
value:!1,writable:!0,configurable:!0
}),Object.defineProperty(_assertThisInitialized(_this2),"onabort",{
value:null,writable:!0,configurable:!0}),_this2}
return _createClass(AbortSignal,[{key:"toString",
value:function(){return"[object AbortSignal]"}},{
key:"dispatchEvent",value:function(event){
"abort"===event.type&&(this.aborted=!0,
"function"==typeof this.onabort&&this.onabort.call(this,event)),
_get(_getPrototypeOf(AbortSignal.prototype),"dispatchEvent",this).call(this,event)
}}]),AbortSignal
}(Emitter),AbortController=function(){
function AbortController(){
_classCallCheck(this,AbortController),Object.defineProperty(this,"signal",{
value:new AbortSignal,writable:!0,configurable:!0
})}return _createClass(AbortController,[{
key:"abort",value:function(){var event;try{
event=new Event("abort")}catch(e){
"undefined"!=typeof document?document.createEvent?(event=document.createEvent("Event")).initEvent("abort",!1,!1):(event=document.createEventObject()).type="abort":event={
type:"abort",bubbles:!1,cancelable:!1}}
this.signal.dispatchEvent(event)}},{
key:"toString",value:function(){
return"[object AbortController]"}
}]),AbortController}()
;"undefined"!=typeof Symbol&&Symbol.toStringTag&&(AbortController.prototype[Symbol.toStringTag]="AbortController",
AbortSignal.prototype[Symbol.toStringTag]="AbortSignal"),
function(self){(function(self){
return self.__FORCE_INSTALL_ABORTCONTROLLER_POLYFILL?(console.log("__FORCE_INSTALL_ABORTCONTROLLER_POLYFILL=true is set, will force install polyfill"),
!0):"function"==typeof self.Request&&!self.Request.prototype.hasOwnProperty("signal")||!self.AbortController
})(self)&&(self.AbortController=AbortController,
self.AbortSignal=AbortSignal)
}("undefined"!=typeof self?self:global),"keyIdentifier"in KeyboardEvent.prototype&&Object.defineProperty(KeyboardEvent.prototype,"code",{
enumerable:!0,configurable:!0,get:function(){
return this.keyIdentifier}})}();
