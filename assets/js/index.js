
const user=wallet.getAccountId();
const userName=wallet.getAccountId().split('.')[0];
const radix=Math.pow(10,24);

let dialogEvent=function(data){
    $(document).dialog({
        type: "notice",
        infoText: data,
        autoClose: 1500,
        onClosed: () => {
            console.log('dialog')
        }
    });
};
let formattedNumber=function(num) {
    var num = (num || 0).toString();
    var len= parseInt(num.length)-2
    var result = '';
    while (num.length > 4) {
        result = ' , ' + num.slice(-2) + result;
        num = num.slice(0, num.length - 2);
    }
    if (num) { result = num + result; }
    return result;
};

let getAccountUnstakedBalance=new Promise(function(resolve, reject){
    window.contract.get_account_unstaked_balance({"account_id": user}).then(res => {
        if (res.length != 0) {
            resolve(res)
        } else {
            console.log('error');
            dialogEvent('get_account_unstaked_balance is error');
        }
    });
});
let getAccountStakedShare=new Promise(function(resolve, reject){
    window.contract.get_account_staked_share({"account_id": user}).then(res => {
        if (res.length != 0) {
            resolve(res)
        } else {
            console.log('error');
            dialogEvent('get_account_staked_share is error');
        }
    });
});
let getAccountStakedBalance=new Promise(function(resolve, reject){
    window.contract.get_account_staked_balance({"account_id": user}).then(res => {
        if (res.length != 0) {
            resolve(res)
        } else {
            console.log('error');
            dialogEvent('get_account_staked_balance is error');
        }
    });
});
let getAccountTotalBalance=new Promise(function(resolve, reject){
    window.contract.get_account_total_balance({"account_id": user}).then(res => {
        if (res.length != 0) {
            resolve(res)
        } else {
            console.log('error');
            dialogEvent('get_account_total_balance is error');
        }
    });
});
let getTotalShare=new Promise(function(resolve, reject){
    window.contract.get_total_share({}).then(res => {
        if (res.length != 0) {
            resolve(res)
        } else {
            console.log('error');
            dialogEvent('get_total_share is error');
        }
    });
});
let getTotalStakedBalance=new Promise(function(resolve, reject){
    window.contract.get_total_staked_balance({"account_id": user}).then(res => {
        if (res.length != 0) {
            resolve(res)
        } else {
            console.log('error');
            dialogEvent('get_total_staked_balance is error');
        }
    });
});
let getRewardFeeFraction=new Promise(function(resolve, reject){
    window.contract.get_reward_fee_fraction({}).then(res => {
        if (res.length != 0) {
            resolve(res)
        } else {
            console.log('error');
            dialogEvent('get_reward_fee_fraction is error');
        }
    });
});
let getUnstakedAvailableEpochHeight=new Promise(function(resolve, reject){
    window.contract.get_unstaked_available_epoch_height({"account_id": user}).then(res => {
        if (res.length != 0) {
            resolve(res)
        } else {
            console.log('error');
            dialogEvent('get_unstaked_available_epoch_height is error');
        }
    });
});
let getEpochHeight=new Promise(function(resolve, reject){
    window.contract.get_epoch_height({}).then(res => {
        if (res.length != 0) {
            resolve(res)
        } else {
            console.log('error');
            dialogEvent('get_epoch_height is error');
        }
    });
});
let depositEvent=function(resolve, reject){
    let accountType=$(".accountType").attr('data-type');
    let layerValTest=$(".layerValTest").val();
    let at='000000000000000000000000';
    let loading = $(document).dialog({
        type: "toast",
        infoIcon: "./assets/images/loading.gif",
        infoText: "加载中"
    });
    setTimeout(function(){
        loading.close()
    },10000);

    switch (accountType) {
        case 'Deposit':
            window.contract.deposit({}, gas, layerValTest+at).then(res => {
                if (res.length != 0) {
                    console.log(res)
                } else {
                    console.log('error');
                    dialogEvent('get_epoch_height is error');
                }
                loading.close();
            });
            break;
        case 'Withdraw':
            window.contract.withdraw({"amount":layerValTest+at},gas).then(res => {
                console.log(res)
                if (res.length != 0) {
                    console.log(res)
                } else {
                    console.log('error');
                    dialogEvent('withdraw is error');
                }
                loading.close();
            });
            break;
        case 'Stake':
            window.contract.stake({"amount":layerValTest+at},gas).then(res => {
                console.log(res)
                if (res.length != 0) {
                    console.log(res)
                } else {
                    console.log('error');
                    dialogEvent('stake is error');
                }
                loading.close();
            });
            break;
        case 'Unstake':
            window.contract.unstake({"amount":layerValTest+at},gas).then(res => {
                console.log(res)
                if (res.length != 0) {
                    console.log(res)
                } else {
                    console.log('error');
                    dialogEvent('unstake is error');
                }
                loading.close();
            });
            break;
        default:
            dialogEvent('error');

    }

};
$(function(){
    // near detail
    console.log(wallet)
    // wallet.account().state().then(data => {
    //     console.log(data)
    //     console.log(data.amount/Math.pow(10,24))
    // });

    //name
    $(".boxTopIcon").text(userName);

    //可用量
    let available=getAccountUnstakedBalance.then(res=>{
        // console.log(res);
        $(".Available").text((parseInt(res)/radix).toFixed(2));
        return res
    });

    //抵押份额
    let stakedShare=getAccountStakedShare.then(res=>{
        // console.log(res);
        $(".StakingShare").text((parseInt(res)/radix).toFixed(2));
        return res
    });

    //抵押量
    let stakedBalance=getAccountStakedBalance.then(res=>{
        // console.log(res);
        $(".StakingBalance").text((parseInt(res)/radix).toFixed(2));
        return res
    });

    //总权益
    let totalBalance=getAccountTotalBalance.then(res=>{
        // console.log(res);
        $(".TotalBalance").text((parseInt(res)/radix).toFixed(2));
        return res
    });

    //总抵押份额
    let totalShare=getTotalShare.then(res=>{
        // console.log(res);
        $(".TotalShare").text((parseInt(res)/radix).toFixed(2));
        return res
    });

    //在途
    let frozen=Promise.all([totalBalance,available,stakedBalance]).then(([totalBalance,available,stakedBalance])=>{
        // console.log(totalBalance,available,stakedBalance);
        let tas=totalBalance-(available+stakedBalance);
        return tas;

    });
    frozen.then(res=>{
        $(".Frozen").text(res);
    });

    //圆环比例
    let scale=Promise.all([stakedShare,totalShare]).then(([stakedShare,totalShare])=>{
        // console.log(stakedShare);
        // console.log(totalShare)
        let tas=stakedShare/totalShare;
        echartEvent([stakedShare,totalShare])
        return tas;

    });

    //池区
    window.contract.get_owner_id({}).then(res => {
        if (res.length != 0) {
            $(".Onwer").text(res);
        } else {
            console.log('error');
            dialogEvent('get_owner_id is error');
        }
    });

    //总抵押量
    let totalStaking=getTotalStakedBalance.then(res=>{
        // console.log(res);
        $(".TotalStaking").text((parseInt(res)/radix).toFixed(2));
        return res
    });

    //当前份额单
    let sharePrice=Promise.all([totalStaking,totalShare]).then(([totalStaking,totalShare])=>{
        // console.log(totalBalance,available,stakedBalance);
        let tp=totalStaking/totalShare;
        return tp;

    });
    sharePrice.then(res=>{
        $(".SharePrice").text(res);
    });

    //抽成比例
    let rewardFeeRate=getRewardFeeFraction.then(res=>{
        $(".RewardFeeRate").text(res.numerator/res.denominator+'%');
        return res
    });

    //withdrawEpoch--curEpoch
    getUnstakedAvailableEpochHeight.then(res=>{
        $(".withdrawEpoch").text(res);
    });
    getEpochHeight.then(res=>{
        $(".curEpoch").text(res);
    });

    //充值转账
    $(".buttonListIcon").each(function(){
        $(this).click(async function(){
            let type=$(this).attr('data-type');
            let user=$(".boxTopIcon").text();
            let Available=$(".Available").text();
            let StakingShare=$(".StakingShare").text();
            let StakingBalance=$(".StakingBalance").text();

            await wallet.account().state().then(data => {
                // console.log(data)
                Available=(parseInt(data.amount)/radix).toFixed(2)
            });

            switch(type) {
                case 'Deposit':
                    $(".neTag1").attr('src','assets/images/ne03.png');
                    $(".neTag2").attr('src','assets/images/ne01.png');
                    $(".isShow").hide();

                    $(".AvailableB").text(Available);
                    $(".StakingShareB").text(StakingShare);
                    break;
                case 'Withdraw':
                    $(".neTag1").attr('src','assets/images/ne01.png');
                    $(".neTag2").attr('src','assets/images/ne03.png');
                    $(".isShow").hide();

                    $(".AvailableB").text(Available);
                    $(".StakingShareB").text(StakingShare);
                    break;
                case 'Stake':
                    $(".neTag1").attr('src','assets/images/ne01.png');
                    $(".neTag2").attr('src','assets/images/ne04.png');
                    $(".isShow").show();

                    $(".AvailableB").text(Available);
                    $(".StakingShareB").text(StakingShare);
                    $(".StakingPriceB").text(StakingBalance);
                    break;
                case 'Unstake':
                    $(".neTag1").attr('src','assets/images/ne04.png');
                    $(".neTag2").attr('src','assets/images/ne01.png');
                    $(".isShow").show();

                    $(".AvailableB").text(Available);
                    $(".StakingShareB").text(StakingShare);
                    $(".StakingPriceB").text(StakingBalance);
                    break;
                default:
                    dialogEvent('error');
            }
            $(".layerWrap").show();


            $(".accountType").css('backgroundImage',"url('assets/images/"+type+".png')").attr('data-type',type);
            $(".boxTopIconB").text(user);


        })
    });
    $(".layerWrap").click(function(){
        $(".layerWrap").hide();
    });
    $(".layerBox").click(function(e){
        e.stopPropagation()
    });
    $(".layerTop button").click(function(){
        $(".layerWrap").hide();
    });
    $(".uploadBtn").unbind('click').click(function(){
        let layerValTest=$(".layerValTest").val();
        if(layerValTest==''){
            dialogEvent('请填写数值');
            return false
        }else {
            depositEvent();
        }
    });
});
