
class Component extends DCLogic {
  state = {
    route:'dashboard',
    homeBlocks:[
      {id:'slide', name:'اسلایدشو اصلی', kind:'slide', desc:'۳ بنر', status:'pub', updated:'۲ ساعت پیش'},
      {id:'new', name:'کالاهای جدید', kind:'prod', desc:'۸ کالا', status:'pub', updated:'دیروز'},
      {id:'best', name:'کالای پرفروش', kind:'prod', desc:'۶ کالا', status:'pub', updated:'۳ روز پیش'},
      {id:'brand', name:'معرفی برند', kind:'text', desc:'متن + CTA', status:'pub', updated:'هفته گذشته'},
      {id:'process', name:'فرآیند تولید', kind:'text', desc:'متن', status:'draft', updated:'۱ ساعت پیش'},
      {id:'collection', name:'معرفی کالکشن', kind:'prod', desc:'۱۲ کالا', status:'pub', updated:'۴ روز پیش'},
      {id:'special', name:'فروش‌های ویژه', kind:'prod', desc:'۵ کالا', status:'draft', updated:'۳۰ دقیقه پیش'},
      {id:'promo', name:'پیام تبلیغاتی', kind:'text', desc:'بنر متنی', status:'hidden', updated:'۲ هفته پیش'},
    ],
    editorOpen:false, editId:null, editSel:{},
    secKind:'about',
    faqCat:0, faqOpenId:null, faqAddOpen:false, faqAddCat:0,
    blogCat:0,
    certTab:0, certVis:{},
    previewOpen:false,
    confirmOpen:false, confirmMsg:'', confirmFn:null,
    notifOpen:false, navCollapsed:false, navOpen:false,
    toast:'', toastOpen:false, toastKind:'ok',
  };
  componentDidMount(){ if(this.props.defaultRoute) this._toRoute(this.props.defaultRoute); }

  fa(n){ return String(n).replace(/[0-9]/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]); }
  grp(n){ return this.fa(String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '٬')); }
  toast(m,kind){ this.setState({toast:m,toastOpen:true,toastKind:kind||'ok'}); clearTimeout(this._tt); this._tt=setTimeout(()=>this.setState({toastOpen:false}),2600); }
  stop=(e)=>{ e.stopPropagation(); };
  noop=()=>{};

  _toRoute(route){ this.setState({route,notifOpen:false,navOpen:false}); }
  go_dashboard=()=>this._toRoute('dashboard');
  go_home=()=>this._toRoute('home');
  go_about=()=>this.setState({route:'sections',secKind:'about',notifOpen:false,navOpen:false});
  go_coop=()=>this.setState({route:'sections',secKind:'coop',notifOpen:false,navOpen:false});
  go_contact=()=>this._toRoute('contact');
  go_faq=()=>this._toRoute('faq');
  go_blog=()=>this._toRoute('blog');
  go_blogAdd=()=>this._toRoute('blogAdd');
  go_certs=()=>this._toRoute('certs');

  toggleNav=()=>this.setState(s=>({navCollapsed:!s.navCollapsed, navOpen:!s.navOpen}));
  closeNav=()=>this.setState({navOpen:false});
  toggleNotif=()=>this.setState(s=>({notifOpen:!s.notifOpen}));
  closeNotif=()=>this.setState({notifOpen:false});
  openPreview=()=>this.setState({previewOpen:true,notifOpen:false});
  closePreview=()=>this.setState({previewOpen:false});
  publishAll=()=>{ this.setState(s=>({homeBlocks:s.homeBlocks.map(b=>b.status==='draft'?{...b,status:'pub'}:b)})); this.toast('همه تغییرات منتشر شد ✓'); };
  exportList=()=>this.toast('خروجی اکسل از نمای فعلی آماده شد.');

  // ---- home blocks ----
  moveBlock=(idx,dir)=>()=>{ this.setState(s=>{ const a=[...s.homeBlocks]; const j=idx+dir; if(j<0||j>=a.length) return {}; [a[idx],a[j]]=[a[j],a[idx]]; return {homeBlocks:a}; }); };
  toggleVis=(id)=>()=>{ this.setState(s=>({homeBlocks:s.homeBlocks.map(b=>b.id===id?{...b,status:b.status==='hidden'?'draft':'hidden'}:b)})); this.toast('وضعیت نمایش بلوک تغییر کرد.'); };
  openEditor=(id)=>()=>{ const b=this.state.homeBlocks.find(x=>x.id===id); const sel={}; if(b&&b.kind==='prod'){ this._productDefs().forEach((p,i)=>{ sel[i]=i<4; }); } this.setState({editorOpen:true, editId:id, editSel:sel, notifOpen:false}); };
  closeEditor=()=>this.setState({editorOpen:false});
  saveBlock=()=>{ this._setBlockStatus('draft'); this.toast('بلوک به‌عنوان پیش‌نویس ذخیره شد.'); this.setState({editorOpen:false}); };
  publishBlock=()=>{ this._setBlockStatus('pub'); this.toast('بلوک منتشر شد ✓'); this.setState({editorOpen:false}); };
  _setBlockStatus(st){ const id=this.state.editId; this.setState(s=>({homeBlocks:s.homeBlocks.map(b=>b.id===id?{...b,status:st,updated:'هم‌اکنون'}:b)})); }
  toggleProd=(i)=>()=>this.setState(s=>({editSel:{...s.editSel,[i]:!s.editSel[i]}}));

  _status(s){ const m={ pub:['منتشرشده','#1F8A5B','#E8F5EF'], draft:['پیش‌نویس','#C8841A','#FDF3E2'], hidden:['مخفی','#7C8A99','#EEF1F4'] }; return m[s]; }
  _sw(i){ return ['#D98EA8','#8FB6D6','#C7A87C','#9CC3A0','#B79AD0','#E0A07A','#7FBFBF','#D69CA0','#C99AA0','#8E9CC9'][i%10]; }
  _grad(i){ return ['linear-gradient(135deg,#F1ECF7,#E3D6F0)','linear-gradient(135deg,#E8F0FB,#D5E4F7)','linear-gradient(135deg,#FBF0E2,#F5E2C8)','linear-gradient(135deg,#E8F5EF,#D2Ede0)','linear-gradient(135deg,#FBEDED,#F7D9D9)','linear-gradient(135deg,#EEF1F4,#E0E6EC)'][i%6]; }

  _productDefs(){
    return [
      {name:'ست لباس خواب ساتن', price:398000},
      {name:'سوتین بدون فنر دانتل', price:286000},
      {name:'ربدوشامبر حریر بلند', price:512000},
      {name:'پیراهن خواب ویسکوز', price:345000},
      {name:'لگ راحتی مودال', price:198000},
      {name:'بوکسر مردانه نخی', price:224000},
      {name:'تاپ بندی کشی', price:142000},
      {name:'شورت زنانه نخی', price:168000},
    ];
  }

  renderVals(){
    const st=this.state, route=st.route;
    const draftN=st.homeBlocks.filter(b=>b.status==='draft').length;
    const v={
      crumbGroup:this._routeGroup(), crumbPage:this._routeTitle(),
      notifCount:'۴',
      sidebarCls:'sidebar'+(st.navCollapsed?' collapsed':'')+(st.navOpen?' open':''),
      backdropCls:'sidebar-backdrop'+(st.navOpen?' show':''),
      navGroups:this._navGroups(), notifications:this._notifications(), notifOpen:st.notifOpen,
      toastOpen:st.toastOpen, toastMsg:st.toast, toastIcon:st.toastKind==='warn'?'!':'✓', toastIconBg:st.toastKind==='warn'?'#C8841A':'#1F8A5B',
      is_dashboard:route==='dashboard', is_home:route==='home', is_sections:route==='sections',
      is_contact:route==='contact', is_faq:route==='faq', is_blog:route==='blog', is_blogAdd:route==='blogAdd', is_certs:route==='certs',
      stop:this.stop, closeNav:this.closeNav, toggleNav:this.toggleNav, toggleNotif:this.toggleNotif, closeNotif:this.closeNotif,
      openPreview:this.openPreview, closePreview:this.closePreview, previewOpen:st.previewOpen, previewProducts:this._previewProducts(),
      publishAll:this.publishAll, exportList:this.exportList, hasDrafts:draftN>0,
      go_blog:this.go_blog, go_blogAdd:this.go_blogAdd, noop:this.noop,
      rtTools:this._rtTools(),
      // editor drawer
      editorOpen:st.editorOpen, edit:st.editorOpen?this._editVals():{}, closeEditor:this.closeEditor,
      saveBlock:this.saveBlock, publishBlock:this.publishBlock,
      uploadBanner:()=>this.toast('انتخاب فایل بنر.'), uploadCover:()=>this.toast('انتخاب تصویر شاخص.'),
      // faq modal
      faqAddOpen:st.faqAddOpen, closeFaqAdd:this.closeFaqAdd, submitFaq:this.submitFaq, faqAddCats:this._faqAddCats(),
      // confirm
      confirmOpen:st.confirmOpen, confirmMsg:st.confirmMsg, closeConfirm:this.closeConfirm, doConfirm:this.doConfirm,
    };
    if(route==='dashboard') Object.assign(v, this._dashVals());
    if(route==='home') Object.assign(v, this._homeVals());
    if(route==='sections') Object.assign(v, this._sectionVals());
    if(route==='contact') Object.assign(v, this._contactVals());
    if(route==='faq') Object.assign(v, this._faqVals());
    if(route==='blog') Object.assign(v, this._blogVals());
    if(route==='blogAdd') Object.assign(v, this._blogAddVals());
    if(route==='certs') Object.assign(v, this._certVals());
    return v;
  }

  _rtTools(){ return [{glyph:'B',title:'درشت'},{glyph:'I',title:'مورب'},{glyph:'U',title:'زیرخط'},{glyph:'•',title:'فهرست'},{glyph:'🔗',title:'پیوند'},{glyph:'❝',title:'نقل‌قول'}].map(t=>({...t, fmt:()=>this.toast('قالب‌بندی اعمال شد.')})); }
  _previewProducts(){ return this._productDefs().slice(0,3).map((p,i)=>({ name:p.name, price:this.grp(p.price), sw:this._sw(i) })); }

  // ---------- dashboard ----------
  _dashVals(){
    const bl=this.state.homeBlocks;
    const pub=bl.filter(b=>b.status==='pub').length, dr=bl.filter(b=>b.status==='draft').length;
    const kpis=[
      {value:'۶', unit:'از ۸', label:'صفحات منتشرشده', tag:'فعال', tagFg:'#1F8A5B', tagBg:'#E8F5EF', bg:'#E8F5EF', fg:'#1F8A5B', i_page:true, go:this.go_home},
      {value:this.fa(pub+dr), unit:'بلوک', label:'بلوک صفحه اصلی', tag:this.fa(dr)+' پیش‌نویس', tagFg:'#C8841A', tagBg:'#FDF3E2', bg:'#FBEDED', fg:'#D74E54', i_block:true, go:this.go_home},
      {value:'۲۴', unit:'مقاله', label:'مقالات وبلاگ', tag:'۳ دسته', tagFg:'#2A6FDB', tagBg:'#E8F0FB', bg:'#E8F0FB', fg:'#2A6FDB', i_blog:true, go:this.go_blog},
      {value:'۳۸', unit:'سوال', label:'سوالات متداول', tag:'۴ گروه', tagFg:'#8E6CB0', tagBg:'#F1ECF7', bg:'#F1ECF7', fg:'#8E6CB0', i_faq:true, go:this.go_faq},
    ];
    const sdef=[
      {name:'صفحه اصلی', icon:'🏠', s:'pub', updated:'۲ ساعت پیش', go:this.go_home},
      {name:'درباره ما', icon:'ℹ️', s:'pub', updated:'هفته گذشته', go:this.go_about},
      {name:'همکاری با ما', icon:'🤝', s:'draft', updated:'۱ روز پیش', go:this.go_coop},
      {name:'سوالات متداول', icon:'❓', s:'pub', updated:'۳ روز پیش', go:this.go_faq},
      {name:'وبلاگ', icon:'📝', s:'pub', updated:'دیروز', go:this.go_blog},
      {name:'تماس با ما', icon:'📞', s:'pub', updated:'۲ هفته پیش', go:this.go_contact},
      {name:'گواهی‌ها', icon:'🏅', s:'pub', updated:'ماه گذشته', go:this.go_certs},
      {name:'مجوزها و استانداردها', icon:'📜', s:'draft', updated:'۵ روز پیش', go:this.go_certs},
    ];
    const surfaces=sdef.map((x,i)=>{ const st=this._status(x.s); return { name:x.name, icon:x.icon, bg:this._softBg(i), fg:'#7a7a85', updated:x.updated, status:st[0], stFg:st[1], stBg:st[2], go:x.go }; });
    const activity=[
      {title:'بلوک «فروش‌های ویژه» ویرایش شد', by:'نگار سلیمی', time:'۳۰ دقیقه پیش', bg:'#FDF3E2', fg:'#C8841A'},
      {title:'مقاله «راهنمای انتخاب سایز سوتین» منتشر شد', by:'تیم محتوا', time:'۲ ساعت پیش', bg:'#E8F5EF', fg:'#1F8A5B'},
      {title:'سوال جدید در گروه «پارچه و مراقبت» افزوده شد', by:'نگار سلیمی', time:'دیروز', bg:'#F1ECF7', fg:'#8E6CB0'},
      {title:'گواهی استاندارد نساجی به‌روزرسانی شد', by:'واحد کیفیت', time:'۳ روز پیش', bg:'#E8F0FB', fg:'#2A6FDB'},
      {title:'اطلاعات تماس فروشگاه ویرایش شد', by:'نگار سلیمی', time:'هفته گذشته', bg:'#FBEDED', fg:'#D74E54'},
    ];
    return { kpis, surfaces, activity };
  }
  _softBg(i){ return ['#FBEDED','#E8F0FB','#FDF3E2','#F1ECF7','#E8F5EF','#FBF0E2','#EEF1F4','#F4ECE3'][i%8]; }

  // ---------- home ----------
  _homeVals(){
    const bl=this.state.homeBlocks;
    const iconMap={ slide:['#FBEDED','#D74E54'], prod:['#E8F0FB','#2A6FDB'], text:['#F1ECF7','#8E6CB0'] };
    const homeBlocks=bl.map((b,i)=>{ const stt=this._status(b.status); const ic=iconMap[b.kind]; const last=i===bl.length-1;
      return { id:b.id, name:b.name, desc:b.desc, updated:b.updated, status:stt[0], stFg:stt[1], stBg:stt[2],
        iconBg:ic[0], iconFg:ic[1], i_slide:b.kind==='slide', i_prod:b.kind==='prod', i_text:b.kind==='text',
        up:this.moveBlock(i,-1), down:this.moveBlock(i,1), upColor:i===0?'#dcdce2':'#9a9aa5', downColor:last?'#dcdce2':'#9a9aa5',
        visible:b.status!=='hidden', hidden:b.status==='hidden', visColor:b.status==='hidden'?'#c4c4cc':'#1F8A5B',
        visTitle:b.status==='hidden'?'نمایش بلوک':'مخفی کردن بلوک', toggleVis:this.toggleVis(b.id), edit:this.openEditor(b.id) }; });
    return { homeBlocks, blockCount:this.fa(bl.length),
      publishedCount:this.fa(bl.filter(b=>b.status==='pub').length),
      draftCount:this.fa(bl.filter(b=>b.status==='draft').length),
      hiddenCount:this.fa(bl.filter(b=>b.status==='hidden').length) };
  }

  // ---------- editor drawer ----------
  _editVals(){
    const b=this.state.homeBlocks.find(x=>x.id===this.state.editId); if(!b) return {};
    const iconMap={ slide:['#FBEDED','#D74E54'], prod:['#E8F0FB','#2A6FDB'], text:['#F1ECF7','#8E6CB0'] };
    const ic=iconMap[b.kind];
    const base={ name:b.name, iconBg:ic[0], iconFg:ic[1], i_slide:b.kind==='slide', i_prod:b.kind==='prod', i_text:b.kind==='text',
      isSlide:b.kind==='slide', isProd:b.kind==='prod', isText:b.kind==='text' };
    if(b.kind==='slide'){
      base.banners=[
        {title:'بنر کالکشن پاییز', cta:'مشاهده کالکشن', thumb:'linear-gradient(120deg,#DF6F73,#D74E54)', remove:()=>this.toast('بنر حذف شد.')},
        {title:'بنر فروش ویژه', cta:'خرید با تخفیف', thumb:'linear-gradient(120deg,#8E6CB0,#6E4F94)', remove:()=>this.toast('بنر حذف شد.')},
        {title:'بنر محصولات جدید', cta:'تازه‌ها', thumb:'linear-gradient(120deg,#3FA776,#1F8A5B)', remove:()=>this.toast('بنر حذف شد.')},
      ];
    }
    if(b.kind==='prod'){
      const sel=this.state.editSel;
      base.products=this._productDefs().map((p,i)=>({ name:p.name, price:this.grp(p.price), sw:this._sw(i), sel:!!sel[i],
        toggle:this.toggleProd(i), border:sel[i]?'#D74E54':'#ececec', bg:sel[i]?'#FBEDED':'#fff',
        checkBorder:sel[i]?'#D74E54':'#d4d4dc', checkBg:sel[i]?'#D74E54':'transparent' }));
      base.selCount=this.fa(Object.values(sel).filter(Boolean).length);
    }
    if(b.kind==='text'){
      const m={ brand:['معرفی برند زیرا','زیرا مارکت تولیدکننده پوشاک راحتی و زیرپوش با بیش از یک دهه تجربه است. ما با شبکه‌ای گسترده از همکاران عمده‌فروش، کیفیت و تنوع را به فروشگاه شما می‌آوریم.','درباره ما','/about'],
        process:['فرآیند تولید','از انتخاب پارچه تا بسته‌بندی نهایی، هر مرحله با کنترل کیفیت دقیق انجام می‌شود.','مشاهده فرآیند','/process'],
        promo:['ارسال رایگان عمده','برای سفارش‌های بالای ۲۰ میلیون تومان، ارسال به سراسر کشور رایگان است.','ثبت سفارش','/wholesale'] }[b.id]||['عنوان بلوک','متن نمونه','دکمه','/'];
      base.heading=m[0]; base.body=m[1]; base.ctaLabel=m[2]; base.ctaTarget=m[3];
    }
    return base;
  }

  // ---------- sections (about / coop) ----------
  _sectionVals(){
    const k=this.state.secKind;
    const aboutSecs=[
      {name:'معرفی برند', body:'زیرا مارکت، برندی پیشرو در تولید پوشاک راحتی و زیرپوش با تمرکز بر کیفیت پارچه و دوام محصول.', s:'pub'},
      {name:'درباره شرکت', body:'شرکت زیرا در سال ۱۳۹۲ تاسیس شد و امروز یکی از بزرگ‌ترین تامین‌کنندگان پوشاک راحتی عمده در کشور است.', s:'pub'},
      {name:'سابقه و افتخارات', body:'بیش از یک دهه فعالیت، دریافت استاندارد ملی نساجی و همکاری با بیش از ۱٬۰۰۰ فروشگاه.', s:'pub'},
      {name:'محصولات', body:'دسته‌بندی محصولات شامل لباس خواب، زیرپوش، لباس راحتی و پوشاک منزل برای تمام رده‌های سنی.', s:'draft'},
      {name:'همکاران', body:'شبکه گسترده‌ای از عمده‌فروشان و فروشگاه‌های زنجیره‌ای در سراسر کشور.', s:'pub'},
    ];
    const coopSecs=[
      {name:'معرفی همکاری', body:'فرصت همکاری با زیرا مارکت برای عمده‌فروشان و فروشگاه‌داران با شرایط ویژه و پشتیبانی اختصاصی.', s:'pub'},
      {name:'مراحل همکاری', body:'۱. ثبت درخواست ۲. بررسی پروانه کسب ۳. تایید و تخصیص سطح اعتبار ۴. شروع سفارش‌گذاری.', s:'pub'},
      {name:'شرایط همکاری', body:'داشتن پروانه کسب معتبر و حداقل یک سال سابقه فعالیت در حوزه پوشاک.', s:'draft'},
      {name:'قوانین عمده‌فروشی', body:'قیمت‌گذاری پلکانی بر اساس حجم سفارش و سطح همکاری مشتری.', s:'pub'},
      {name:'شرایط تسویه حساب', body:'امکان تسویه نقدی، چکی و اعتباری بر اساس سطح خوش‌حسابی مشتری.', s:'pub'},
      {name:'حداقل سفارش', body:'حداقل مبلغ سفارش برای عمده‌فروشان ۵ میلیون تومان است.', s:'draft'},
    ];
    const defs = k==='about'?aboutSecs:coopSecs;
    const sections=defs.map((x,i)=>{ const stt=this._status(x.s); return { num:this.fa(i+1), name:x.name, body:x.body, status:stt[0], stFg:stt[1], stBg:stt[2],
      chars:this.fa(x.body.length), fmt:()=>this.toast('قالب‌بندی اعمال شد.'), save:()=>this.toast('بخش «'+x.name+'» ذخیره شد.') }; });
    return { sections, secHasFile:k==='coop', uploadGuide:()=>this.toast('انتخاب فایل راهنما.'),
      secTitle:k==='about'?'درباره ما':'همکاری با ما',
      secSubtitle:k==='about'?'بخش‌های صفحه «درباره ما» را ویرایش و منتشر کنید':'شرایط، مراحل و قوانین همکاری عمده‌فروشی' };
  }

  // ---------- contact ----------
  _contactVals(){
    const contactPhones=[
      {label:'تلفن ثابت ۱', value:'۰۲۱ ۶۶۷۸ ۹۰۱۲'},
      {label:'تلفن ثابت ۲', value:'۰۲۱ ۶۶۷۸ ۹۰۱۳'},
      {label:'موبایل ۱', value:'+98 912 345 6789'},
      {label:'موبایل ۲ (پشتیبانی)', value:'+98 935 120 8845'},
    ];
    const socials=[
      {label:'اینستاگرام', icon:'📷', value:'instagram.com/ziramarket', bg:'#FBEDED', fg:'#D74E54'},
      {label:'تلگرام', icon:'✈️', value:'t.me/ziramarket', bg:'#E8F0FB', fg:'#2A6FDB'},
      {label:'واتس‌اپ', icon:'💬', value:'wa.me/989123456789', bg:'#E8F5EF', fg:'#1F8A5B'},
      {label:'وب‌سایت', icon:'🌐', value:'ziramarket.ir', bg:'#F1ECF7', fg:'#8E6CB0'},
    ];
    return { contactPhones, socials, saveContact:()=>this.toast('اطلاعات تماس ذخیره و منتشر شد ✓') };
  }

  // ---------- faq ----------
  _faqDefs(){
    return [
      {q:'جنس محصولات زیرا از چه پارچه‌هایی است؟', a:'بیشتر محصولات از پنبه، مودال و ویسکوز با کیفیت درجه یک تولید می‌شوند که نرمی و دوام بالایی دارند.', cat:0, date:'۱۴۰۴/۰۹/۱۰'},
      {q:'جدول سایزبندی محصولات کجاست؟', a:'در هر صفحه محصول جدول سایز اختصاصی قرار دارد؛ همچنین راهنمای کلی سایز در بخش وبلاگ موجود است.', cat:1, date:'۱۴۰۴/۰۹/۰۴'},
      {q:'تفاوت مدل‌های سوتین بدون فنر و فنردار چیست؟', a:'مدل بدون فنر راحتی بیشتری برای استفاده روزانه دارد و مدل فنردار فرم‌دهی بهتری ارائه می‌دهد.', cat:2, date:'۱۴۰۴/۰۸/۲۸'},
      {q:'نحوه مراقبت و شست‌وشوی محصولات چگونه است؟', a:'شست‌وشو با آب سرد، پرهیز از خشک‌کن داغ و اتوی ملایم برای حفظ کیفیت پارچه توصیه می‌شود.', cat:3, date:'۱۴۰۴/۰۸/۲۰'},
      {q:'آیا امکان سفارش عمده با تخفیف وجود دارد؟', a:'بله، عمده‌فروشان پس از تایید پروانه کسب از قیمت‌گذاری پلکانی و تخفیف ویژه بهره‌مند می‌شوند.', cat:0, date:'۱۴۰۴/۰۸/۱۲'},
      {q:'پارچه محصولات ضدحساسیت است؟', a:'محصولات خط پنبه‌ای ما با رنگ‌های استاندارد و بدون مواد حساسیت‌زا تولید می‌شوند.', cat:3, date:'۱۴۰۴/۰۸/۰۱'},
    ];
  }
  _faqCatLabels(){ return ['جنس محصولات','اندازه‌ها و سایزها','تفاوت مدل‌ها','پارچه و مراقبت']; }
  _faqCatColor(i){ return [['#D74E54','#FBEDED'],['#2A6FDB','#E8F0FB'],['#8E6CB0','#F1ECF7'],['#1F8A5B','#E8F5EF']][i]; }
  _faqVals(){
    const st=this.state, defs=this._faqDefs(), labels=this._faqCatLabels();
    const all=[{label:'همه'}].concat(labels.map(l=>({label:l})));
    const cats=all.map((c,i)=>{ const sel=st.faqCat===i;
      const cnt=i===0?defs.length:defs.filter(d=>d.cat===i-1).length;
      return { label:c.label, count:this.fa(cnt), pick:()=>this.setState({faqCat:i,faqOpenId:null}),
        border:sel?'#D74E54':'#e6e6ea', bg:sel?'#FBEDED':'#fff', fg:sel?'#D74E54':'#777',
        countBg:sel?'#fff':'#f1f1f4', countFg:sel?'#D74E54':'#999' }; });
    const filtered=defs.map((d,gi)=>({...d,gi})).filter(d=>st.faqCat===0||d.cat===st.faqCat-1);
    const faqRows=filtered.map((d,i)=>{ const cc=this._faqCatColor(d.cat); const open=st.faqOpenId===d.gi;
      return { row:this.fa(i+1), question:d.q, answer:d.a, cat:labels[d.cat], catFg:cc[0], catBg:cc[1], date:d.date,
        open, chevRot:open?'rotate(180deg)':'rotate(0deg)', chevColor:open?'#D74E54':'#b3b3bd',
        toggle:()=>this.setState(s=>({faqOpenId:s.faqOpenId===d.gi?null:d.gi})),
        edit:(e)=>{ e.stopPropagation(); this.toast('ویرایش سوال باز شد.'); },
        del:(e)=>{ e.stopPropagation(); this._confirm('این سوال برای همیشه حذف می‌شود. آیا مطمئن هستید؟', ()=>this.toast('سوال حذف شد.','warn')); } }; });
    return { faqCats:cats, faqRows, faqTotal:this.fa(defs.length) };
  }
  openFaqAdd=()=>this.setState({faqAddOpen:true, faqAddCat:0});
  closeFaqAdd=()=>this.setState({faqAddOpen:false});
  submitFaq=()=>{ this.setState({faqAddOpen:false}); this.toast('سوال جدید ثبت شد ✓'); };
  _faqAddCats(){ const st=this.state; return this._faqCatLabels().map((l,i)=>{ const sel=st.faqAddCat===i; const cc=this._faqCatColor(i);
    return { label:l, pick:()=>this.setState({faqAddCat:i}), border:sel?cc[0]:'#e6e6ea', bg:sel?cc[1]:'#fff', fg:sel?cc[0]:'#777' }; }); }

  // ---------- blog ----------
  _blogDefs(){
    return [
      {code:'BL-1042', title:'راهنمای انتخاب سایز سوتین', subject:'آموزش خرید', cat:0, date:'۱۴۰۴/۰۹/۱۲', views:1840},
      {code:'BL-1038', title:'تفاوت پارچه مودال و ویسکوز', subject:'شناخت پارچه', cat:0, date:'۱۴۰۴/۰۹/۰۵', views:1320},
      {code:'BL-1031', title:'نکات بهداشتی نگهداری لباس زیر', subject:'سلامت', cat:1, date:'۱۴۰۴/۰۸/۲۸', views:2670},
      {code:'BL-1025', title:'پوشاک مناسب دوران بارداری', subject:'بارداری', cat:2, date:'۱۴۰۴/۰۸/۲۰', views:980},
      {code:'BL-1019', title:'چگونه لباس راحتی باکیفیت بخریم', subject:'آموزش خرید', cat:0, date:'۱۴۰۴/۰۸/۱۲', views:1510},
      {code:'BL-1007', title:'مراقبت از پوست در فصل سرد', subject:'سلامت', cat:1, date:'۱۴۰۴/۰۸/۰۱', views:740},
    ];
  }
  _blogCatLabels(){ return ['پارچه‌ها','بهداشت و سلامت','نکات بارداری']; }
  _blogCatColor(i){ return [['#8E6CB0','#F1ECF7'],['#1F8A5B','#E8F5EF'],['#D74E54','#FBEDED']][i]; }
  _blogVals(){
    const st=this.state, defs=this._blogDefs(), labels=this._blogCatLabels();
    const all=[{label:'همه'}].concat(labels.map(l=>({label:l})));
    const cats=all.map((c,i)=>{ const sel=st.blogCat===i;
      return { label:c.label, pick:()=>this.setState({blogCat:i}), border:sel?'#D74E54':'#e6e6ea', bg:sel?'#FBEDED':'#fff', fg:sel?'#D74E54':'#777' }; });
    const filtered=defs.filter(d=>st.blogCat===0||d.cat===st.blogCat-1);
    const blogRows=filtered.map((d,i)=>{ const cc=this._blogCatColor(d.cat);
      return { code:d.code, title:d.title, subject:d.subject, thumb:this._grad(i), cat:labels[d.cat], catFg:cc[0], catBg:cc[1],
        date:d.date, views:this.grp(d.views),
        edit:()=>this.go_blogAdd(), del:()=>this._confirm('مقاله «'+d.title+'» حذف می‌شود. این عمل قابل بازگشت نیست.', ()=>this.toast('مقاله حذف شد.','warn')) }; });
    return { blogCats:cats, blogRows, blogTotal:this.fa(defs.length) };
  }
  _blogAddVals(){
    const addCats=this._blogCatLabels().map((l,i)=>{ const cc=this._blogCatColor(i); return { label:l, fg:cc[0], bg:cc[1], border:cc[1] }; });
    return { addCats, addCategory:()=>this.toast('فرم افزودن دسته‌بندی باز شد.'),
      submitArticle:()=>{ this._toRoute('blog'); this.toast('مقاله ثبت و منتشر شد ✓'); } };
  }

  // ---------- certificates ----------
  _certDefs(){
    return {
      cert:[
        {title:'گواهی استاندارد ملی نساجی', date:'۱۴۰۴/۰۶/۱۲', type:'PDF'},
        {title:'گواهی کنترل کیفیت محصول', date:'۱۴۰۴/۰۵/۲۸', type:'IMG'},
        {title:'گواهی عضویت اتحادیه پوشاک', date:'۱۴۰۴/۰۴/۱۰', type:'PDF'},
        {title:'تاییدیه آزمایشگاه پارچه', date:'۱۴۰۴/۰۳/۲۲', type:'PDF'},
      ],
      lic:[
        {title:'مجوز بهره‌برداری تولید', date:'۱۴۰۴/۰۲/۱۵', type:'PDF'},
        {title:'پروانه کسب صنفی', date:'۱۴۰۳/۱۲/۰۸', type:'IMG'},
        {title:'استاندارد ISO 9001', date:'۱۴۰۳/۱۱/۲۰', type:'PDF'},
      ],
    };
  }
  _certVals(){
    const st=this.state;
    const tabs=['گواهی‌ها','مجوزها و استانداردها'].map((l,i)=>({ label:l, pick:()=>this.setState({certTab:i}),
      bg:st.certTab===i?'#fff':'transparent', fg:st.certTab===i?'#23232d':'#8a8a95', shadow:st.certTab===i?'0 1px 2px rgba(0,0,0,.06)':'none' }));
    const list=st.certTab===0?this._certDefs().cert:this._certDefs().lic;
    const certs=list.map((c,i)=>{ const key=st.certTab+'-'+i; const vis=st.certVis[key]!==false;
      return { title:c.title, date:c.date, type:c.type, thumb:this._softBg(i+2), iconFg:'#D74E54',
        visible:vis, visLabel:vis?'نمایش در سایت':'مخفی', visFg:vis?'#1F8A5B':'#9a9aa5',
        switchBg:vis?'#1F8A5B':'#d4d4dc', knob:vis?'right:2px':'left:2px',
        toggle:()=>this.setState(s=>({certVis:{...s.certVis,[key]:!(s.certVis[key]!==false?true:false)}})),
        view:()=>this.toast('سند باز شد.'), del:()=>this._confirm('سند «'+c.title+'» حذف می‌شود.', ()=>this.toast('سند حذف شد.','warn')) }; });
    return { certTabs:tabs, certs, certUploadLabel:st.certTab===0?'بارگذاری گواهی جدید':'بارگذاری مجوز جدید',
      uploadCert:()=>this.toast('انتخاب فایل سند.') };
  }

  // ---------- confirm ----------
  _confirm(msg, fn){ this.setState({confirmOpen:true, confirmMsg:msg, confirmFn:fn}); }
  closeConfirm=()=>this.setState({confirmOpen:false});
  doConfirm=()=>{ const fn=this.state.confirmFn; this.setState({confirmOpen:false}); if(fn) fn(); };

  // ---------- nav / chrome ----------
  _navGroups(){
    const r=this.state.route, sk=this.state.secKind;
    const on=(active)=>({ bg:active?'#FBEDED':'transparent', fg:active?'#D74E54':'#5a5a64' });
    return [
      {label:'نمای کلی', items:[ {label:'داشبورد محتوا', i_dash:true, go:this.go_dashboard, ...on(r==='dashboard')} ]},
      {label:'صفحات فروشگاه', items:[
        {label:'صفحه اصلی', i_home:true, go:this.go_home, ...on(r==='home')},
        {label:'درباره ما', i_about:true, go:this.go_about, ...on(r==='sections'&&sk==='about')},
        {label:'همکاری با ما', i_coop:true, go:this.go_coop, ...on(r==='sections'&&sk==='coop')},
        {label:'تماس با ما', i_contact:true, go:this.go_contact, ...on(r==='contact')},
      ]},
      {label:'محتوای پویا', items:[
        {label:'سوالات متداول', i_faq:true, go:this.go_faq, badge:'۳۸', badgeBg:'#F1ECF7', badgeFg:'#8E6CB0', ...on(r==='faq')},
        {label:'وبلاگ', i_blog:true, go:this.go_blog, ...on(r==='blog'||r==='blogAdd')},
      ]},
      {label:'اسناد و گواهی‌ها', items:[
        {label:'گواهی‌ها و مجوزها', i_cert:true, go:this.go_certs, ...on(r==='certs')},
      ]},
    ];
  }
  _routeGroup(){ const r=this.state.route; if(r==='dashboard') return 'نمای کلی'; if(['home','sections','contact'].includes(r)) return 'صفحات فروشگاه'; if(['faq','blog','blogAdd'].includes(r)) return 'محتوای پویا'; return 'اسناد و گواهی‌ها'; }
  _routeTitle(){ const r=this.state.route, sk=this.state.secKind;
    if(r==='sections') return sk==='about'?'درباره ما':'همکاری با ما';
    const m={dashboard:'داشبورد محتوا',home:'صفحه اصلی',contact:'تماس با ما',faq:'سوالات متداول',blog:'وبلاگ',blogAdd:'افزودن مقاله',certs:'گواهی‌ها و مجوزها'};
    return m[r]||''; }

  _notifications(){
    return [
      {icon:'📝', bg:'#FDF3E2', fg:'#C8841A', title:'۲ بلوک صفحه اصلی در حالت پیش‌نویس', sub:'تغییرات هنوز منتشر نشده‌اند.', time:'۳۰ دقیقه پیش', go:()=>{this.closeNotif();this._toRoute('home');}},
      {icon:'❓', bg:'#F1ECF7', fg:'#8E6CB0', title:'۳ سوال جدید از مشتریان دریافت شد', sub:'برای افزودن به سوالات متداول بررسی کنید.', time:'۲ ساعت پیش', go:()=>{this.closeNotif();this._toRoute('faq');}},
      {icon:'📜', bg:'#E8F0FB', fg:'#2A6FDB', title:'مجوز استاندارد در حالت پیش‌نویس است', sub:'برای نمایش در سایت منتشر کنید.', time:'دیروز', go:()=>{this.closeNotif();this._toRoute('certs');}},
      {icon:'✅', bg:'#E8F5EF', fg:'#1F8A5B', title:'مقاله «راهنمای انتخاب سایز» منتشر شد', sub:'۱٬۸۴۰ بازدید تاکنون.', time:'۲ روز پیش', go:()=>{this.closeNotif();this._toRoute('blog');}},
    ];
  }
}
