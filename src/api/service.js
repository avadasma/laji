import ax from './axios'
import * as Fun from './fun'

// 检查 用户是否登录
export function FetchCheckLoginState() {
    return ax.post('/person-checkLoginState')
            .then(res => res.data)
}


// 获取网络时间
export function FetchNetTime() {
    return ax.get('/sys-getNetWorkDateTime')
            .then(res => res.data)
}

// 网站首页数据获取
export function FetchIndexData () {
    return ax.get('/indexdataload')
            .then(res => res.data)
}
// 首页最新更新书籍和最新签约书籍
export function FetchIndexLatest () {
    return ax.get('/getMaxNewChapterVOList')
            .then(res => res.data)
}
// 首页最新签约
export function FetchIndexSign() {
    return ax.post("/stacks-bookFiltering", {order: 4, page: 1})
            .then(res => res.data)
}

// 网站排行榜数据加载
export function FetchRankData (type,page) {
    return ax.post('/books-rank', {type:type,page:page})
            .then(res => res.data)
}

// 网站书库数据加载
export function FetchStackListData (op1,op2,op3,op4,op5,page,op6) {
    let data = {
        bookClassificationid:op1,
        bookWorldCount:op2,
        updateTime:op3,
        bookStatus:op4,
        bookCheckStatus:op5,
        startPage:page
    };
    if(Number(op6)){
        data.bookLabid = op6
    }
    return ax.post("/stacks-bookFiltering", data)
            .then(res => res.data)
}

// 书籍详情页数据加载
// 书籍信息
export function FetchBookDetailData (bid) {
    return ax.post('/book-bookInfo', {bookid: bid})
            .then(res => res.data)
}

// 书籍信息简化版
export function FetchBookInfo(bid) {
    return ax.post('/book-showBookInfo', { bookid:bid })
            .then(res => res.data)
}

// 章节列表
export function FetchChapterList (bid) {
    return ax.get('/books-volumeChapterList/'+bid)
            .then(res => res.data)
}

// 书籍评论信息列表
export function FetchBookCommentList (bid, page) {
    page = page || 1
    return ax.post('/comm-getcomminfo', {id:bid,startPage:page,commentType:0,type:1,})
            .then(res => res.data)
}

// 热评
export function FetchBookCommentHot (bid) {
    return ax.post('/comm-HotCommentInfo', { bookid:bid })
            .then(res => res.data)
}

// 书评回复列表
export function FetchBookCommentReply (cid,page) {
    page = page || 1;
    return ax.post("/comm-replyInfo", { commentid:cid,startPage:page })
            .then(res => res.data)
}

// 发布书评
export function FetchAddBookComment(data) {
    let val = data.commentContext
    if(Fun.checkTxt(val,200)){
        return ax.post("/add-getcomminfo", data )
                .then(res => res.data)
    }else {
        return Promise.resolve({})
                .then(res => res.data)
    }
}

// 回复书评
export function FetchReplyBookComment(data) {
    let val = data.replyCommentsContent;
    if(Fun.checkTxt(val,100)){
        return ax.post("/add-replyInfo", data)
                .then(res => res.data)
    }else {
        return Promise.resolve({})
                .then(res => res.data)
    }
}

// 书评点赞
export function FetchCommentLaud(id) {
    return ax.post("/comm-GiveThumbs", {commentId:id})
            .then(res => res.data)
}

// 书籍自动订阅
export function FetchAutoSubscribe (bid,type,select) {
    return ax.post("/userRmemberChose", {bookid:bid,type:type,isSelect:select})
            .then(res => res.data)
}

// 搜索热词
export function FetchSearchHotWords() {
    return ax.get('/sys-hotwords')
            .then(res => res.data)
}

// 书籍分类
export function FetchBookClassName() {
    return ax.get("/ranking-classification")
            .then(res => res.data)
}

// 书库畅销榜
export function FetchBookRankSell() {
    return ax.get('/stacks-changxiaobang')
            .then(res => res.data)
}

// 书库热门标签
export function FetchBookLabel() {
    return ax.get("/stacks-hotLable")
            .then(res => res.data)
}

// 福利
export function FetchAuthorWelfare() {
    return ax.get("/sys-welfareBulletin")
            .then(res => res.data)
}

// 登录
export function FetchUserLogin(data) {
    return ax.post("/person-login", data)
            .then(res => res.data)
}

export function FetchExit() {
    return ax.post('/person-ClearUserInfo')
            .then(res => res.data)
}

// 校验登录或刷新用户信息
export function FetchFreshenInfo() {
    return ax.post("/person-info")
            .then(res => res.data)
}

// 用户消息通知
export function FetchUserMessage() {
    return ax.post('/person-messageCount')
            .then(res => res.data)
}

// 注册
export function FetchUserRegister(data) {
    return ax.post('/person-regInfo', data)
            .then(res => res.data)
}

// 忘记密码

// 阅读章节
export function FetchReadChapter(data) {
    return ax.post('/book-read', data)
            .then(res => res.data)
}

// 加入书架
export function FetchAddBookShelf(bid,user,book) {
    if(Fun.cookie("user_id")){
        return ax.post("/bookshelf-adduserbookshelf", { bookId:bid, userName:user, bookName:book })
                .then(res => res.data)
    }else {
        return Promise.resolve({ returnCode:400 })
    }
}


// 阅读章节

// 吐槽列表
export function FetchGetPrattle(id,page,type) {
    page = page || 1
    let url
    switch (type){
        case 'user':
            url = '/pcomm-getParagraphcommentuid/';
            break;
        case 'book':
            url = '/pcomm-getParagraphcommentbookid/';
            break;
        case 'chapter':
            url = '/pcomm-getParagraphcomment/';
            break;
        default:
            url = "/pcomm-getParagraphcommentpid/";
    }
    return ax.get(url+id+'/'+page)
            .then(res => res.data)
}

// 发布吐槽

export function FetchAddPrattle(data) {
    let val = data.commentContext
    if(Fun.checkTxt(val,50)){
        return ax.post("/pcomm-addParagraphcomment", data)
                .then(res => res.data)
    }else {
        return Promise.resolve({})
    }
}

// 添加阅读记录
export function FetchAddRecords(data) {
    return ax.post("/person-addBookReadRecord", data)
            .then(res => res.data)
    
}

// 订阅章节
export function FetchSubscribeChapter(data) {
    return ax.post("/book-subscription", data)
            .then(res => res.data)
}

// 支付
export function FetchWebPay(type,name,sum) {
    switch (type){
        case 'alipay':{ //支付宝支付
            return ax.post("/payment-alipay", { username:name, apymentType:1, WIDtotal_fee:sum })
                    .then(res => res.data)
        }
        case 'weixin':{ //微信支付
            return ax.post("/WeChatPay/ScanCodePayment", { nickName:name, userPayMoney:sum })
                    .then(res => res.data)
        }
        default:{
            return Promise.resolve({})
        }
    }
}

// 作者中心

// 作者书籍列表
export function FetchAuthorBookList(aid) {
    return ax.post("/book-AuthorAllBookInfo", {authorId:aid})
            .then(res => res.data)
}

// 作者收入
export function FetchAuthorIncome(type,data) {
    switch (type){
        case 'allIncome':{   //总收入
            return ax.post("/allincomestatistics", data)
                    .then(res => res.data)
        }
        case 'monIncome':{ // 月报
            return ax.post("/getAuthorMonthlyreportByAuthormonByAuthorIDWeb", data)
                    .then(res => res.data)
        }
        case 'chapter':{  // 书籍章节订阅详情
            return ax.post("/subscriptionstatistics", data)
                    .then(res => res.data)
        }
        default:{
            return Promise.resolve({returnCode:500})
        }
    }
}

// 最新月报时间
export function FetchLatestMonth() {
    return ax.get('/sys-getDataPosition')
            .then(res => res.data)
}
// 作者收获辣椒
export function FetchAuthorGainLog(page) {
    return ax.post('/spicyirewardticketlog', { startpage:page })
            .then(res => res.data)
}

// 作者中心章节列表
export function FetchAuthorChapterList(bid,type) {
    type = type || 2
    return ax.get('/books-authorChapterList/'+ bid + '/' + type)
            .then(res => res.data)
}

// 站内公告
export function FetchAuthorNotice(page,mid) {
    page = page || 1
    mid = mid || 2
    return ax.get('/sys-getNotice', { params: { page:page,menuId:mid } })
            .then(res => res.data)
}

// 新增书籍 / 编辑书籍信息
export function FetchAuthorHandleBook(data,type) {
    let url
    switch (type){
        case 'dd': //删除草稿
            url = '/chapter-deletedrafts';
            break;
        case 'cc': //章节调序
            url = '/sys-chapteOrderUpdate';
            break;
        case 'cv': //调整分卷
            url = '/chapterToVolume';
            break;
        case 'av': //新增分卷
            url = '/books-addvolume';
            break;
        case 'ac': //新增章节
            url = '/chapter-creates';
            break;
        case 'ec':  //修改章节
            url = '/chapter-update';
            break;
        case 'eb': //修改书籍信息
            url = '/book-update';
                break;
        default: //新增书籍
            url = '/book-create'
        }
    return ax.post(url,data)
            .then(res => res.data)
}

// 新建章节

// 获取书籍、章节、分卷信息
export function FetchGetBookInfo(id, type) {
    let url, data
    data = { bookid : id }
    switch (type){
        case 'rank':
            url = '/ranking-book';
            data = id;
            break;
        case 'search':
            url = '/stacks-search';
            data = id;
            break;
        case 'draft':
            url = '/chapter-getdrafts';
            data = { bookid : id , startpage:1 };
            break;
        case 'volume':
            url = '/books-getvolume';
            data = { bookId : id };
            break;
        case 'chapter': //章节信息
            url = '/chapter-getChapterInfo';
            data = { chapterid:id };
            break;
        case 'label': //书籍标签分类
            url = '/book-EditBookEcho';
            data = {};
            break;
        default: //书籍信息
            url = '/book-showBookInfo';
    }
    if(type === 'label'){
        return ax.get(url, { params: data })
                .then(res => res.data)
    }else {
        return ax.post(url, data)
                .then(res => res.data)
    }
}

// 校验章节名、书名、卷名
export function FetchCheckName(data,type) {
    let url
    switch (type){
        case 'back': //修改密码
            url = '/person-pwdRetrieval';
            break;
        case 'change': //修改密码
            url = '/person-updatepwd';
            break;
        case 'code': //验证码
            url = '/verification/person-checkedCode';
            break;
        case 'phone': //手机号
            url = '/verification/sys-getShortMessage';
            break;
        case 'name': //昵称
            url = '/person-checkNickName/'+data;
            data = {};
            break;
        case 'book':
            url = '/book-checkName';
            break;
        case 'chapter':
            url = '/chapter-checkName';
            break;
        default:
            url = '/books-getCheckVolume';
    }
    if(type === 'name'){
        return ax.get(url, { params: data })
                .then(res => res.data)
    } else {
        return ax.post(url, data)
                .then(res => res.data)
    }
}

// 我的个人中心
export function FetchGetUserData(page,type,id) {
    page = page || 1
    Number(type)?(id = type,type = page):''
    let url,way = 'post'
    let data = { startpage:page }
    switch (type){
        case 'su': //个人信息简化版
            url = '/person-SimplifyUserInfo';
            data = { puserid : id };
            break;
        case 'chat': //私聊记录
            url = '/person-messageRecord/'+id+'/'+page;
            data = {};
            way = 'get';
            break;
        case 'bcom':
            url = '/comm-commInfoByUserId';
            data = { startPage:page, userid:id };
            break;
        case 'sign':  //签到
            url = '/user-signin';
            break;
        case 'notice': //通知
            url = '/sys-getsystemmsg';
            break;
        case 'com': //评论
            url = '/comm-coverReplyInfo';
            data = { startPage:page, userid:id };
            break;
        case 'reCom': //ta的评论
            url = '/person-commentACrep';
            data = { startPage:page, userid:id };
            way = 'get';
            break;
        case 'follow': //关注
            url = '/fans-Follow';
            way = 'get';
            id?data.puserid = id:'';
            break;
        case 'fans': //粉丝
            url = '/fans-myFans';
            way = 'get';
            break;
        case 'reAtt': //ta的关注
            url = '/fans-userFollow';
            way = 'get';
            data.puserid = id;
            break;
        case 'reFan': //ta的粉丝
            url = '/fans-userFans';
            way = 'get';
            data.puserid = id;
            break;
        case 'letter': //粉丝
            url = '/person-message';
            way = 'get';
            break;
        case 'shelf': //书架
            url = '/bookshelf-getuserbookshelf';
            data.userid = id;
            break;
        case 'reLog': //阅读记录
            url = '/person-UserBookReadRecord';
            data.userid = id;
            break;
        default: //签到状态
            url = '/user-signinstate';
            data = {};
            way = 'get';
    }
    if(way === 'get'){
        return ax.get(url, { params:data })
                .then(res => res.data)
    } else {
        return ax.post(url, data)
                .then(res => res.data)
    }
}

export function FetchHandleUserInfo(id,type) {
    let url
    let data = { id : id }
    switch (type){
        case 'sl': //发送私信
            url = '/person-sendmessage';
            data = id;
            break;
        case 'pal': //吐槽点赞
            url = '/paragraphcomment-GiveThumbs';
            data = { paragraphcommentid:id };
            break;
        case 'bal': //书评点赞
            url = '/comm-GiveThumbs';
            data = { commentId:id };
            break;
        case 'dcr': //删除书评回复
            url = '/comm-deletereplyInfo';
            data = { commentid:id };
            break;
        case 'dc': //删除书评
            url = '/comm-delcomminfo';
            data = { id:id,type:0 };
            break;
        case 'dg': //删除吐槽
            url = '/pcomm-delParagraphcomment';
            break;
        case 'ds': //删除书架
            url = '/bookshelf-deluserbookshelf';
            break;
        default: //删除阅读记录
            url = '/person-delBookReadRecord';
    }
    return ax.post(url, data)
            .then(res => res.data)
}

// 我的钱包
export function FetchMineWallet(type,page,id) {
    let url,data = { startpage:page,userid:id };
    switch (type){
        case 'Annuum': //小米椒记录
            url = '/userRecommendTicketRecord';
            break;
        case 'Reward': //辣椒打赏记录
            url = '/spicyirewardticketlogByUserId';
            break;
        case 'Pepper': //金椒记录
            url = '/userGoldenTicketRecord';
            break;
        case 'Consume': //订阅记录
            url = '/userSubscriptionRecord';
            break;
        default: //充值记录
            url = '/user-RechargeRecord';
            data.page = page;
    }
    return ax.post(url, data)
            .then(res => res.data)
}

// 关注、取消关注
export function FetchUpdateInfo(type,uid,aid,aname) {
    let url,data;
    switch (type){
        case 'add':
            url = '/fans-addFans';
            data = { token:uid, followUserName:aname, followId:aid };
            break;
        default:
            url = '/fans-CancelFollow';
            data = { followId:aid, userid:uid };
    }
    return ax.post(url, data)
            .then(res => res.data)
}

export function FetchUserGift(type,count,data) {
    let url
    switch (type){
        case 'reward': //辣椒
            url = '/user-SpicyiRewardTicket';
            data.spicyiTicketCount = count;
            break;
        case 'ticket': //金椒
            url = '/user-RewardGonderTicket';
            data.goldenTicketCount = count;
            break;
        default: //小米椒
            url = '/user-RecommendationTicket';
            data.recommendTicketCount = count;
    }
    return ax.post(url, data)
            .then(res => res.data)
}

// 网站公告
export function FetchWebNotice(id) {
    return ax.get('/sysgetNoticeById', { params: { noticeid:id } })
            .then(res => res.data)
}

export function FetchApplicantAuthor(data) {
    return ax.post('/person-applicantAuthor', data)
            .then(res => res.data)
}

export function FetchIsTop(data) {
    return ax.get("/comm-isTop/"+data.id+"/"+data.bid+"/"+data.state)
            .then(res => res.data)
}

export function FetchClearUserInfo() {
    return ax.post('/person-ClearUserInfo')
            .then(res => res.data)
}

export function FetchPersonUpdateInfo(data) {
    return ax.post('/person-updateInfo', data)
            .then(res => res.data)
}

export function FetchSendmessage(data) {
    return ax.post('/person-sendmessage', data)
            .then(res => res.data)
}

export function FetchUpdatemessage(data) {
    return ax.post('/person-updatemessage', data)
            .then(res => res.data)
}

// 头像上传
export function FetchUserAvatarimgUpload(data) {
    return ax.post('/sys-UserAvatarimgUpload', data)
            .then(res => res.data)
}

// 封面上传
export function FetchBookCoverAvatarimgUpload(data) {
    return ax.post('/sys-BookCoverAvatarimgUpload', data)
            .then(res => res.data)
}