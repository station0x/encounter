"use strict";
// Import the dependency.
const clientPromise = require('../../api-utils/mongodb-client')
const getAddress = require('../../api-utils/getAddress')
var crypto = require('crypto')
var salt = 'getEncounterAccess'

function makeKey(address) {
    address += salt
    let hash = crypto.createHash('md5').update(address).digest('hex')
    return hash
}

module.exports = async (req, res) => {
    const address = getAddress(req.query.signature)
    let buyer = false
    let key = ''
    let timesLeft = 0
    
    if(callistoBuyers[address] === true) {
        key = makeKey()
        timesLeft = 2
        buyer = true
    }

    const client = await clientPromise
    const db = client.db()
    const keys = db.collection("access_keys")
    const keyDoc = (await keys.find({key}).limit(1).toArray())[0]
    if(!keyDoc) {
        await keys.insertOne({
            key,
            timesLeft
        })  
    }
    res.status(200).json({ success: true, buyer, key, timesLeft})
}


const callistoBuyers = { 
    "0xe6c99b2ea60513c954324d1e010a71a5c5a4bae7": true,
    "0x75cace0baba984f721f40443ce4acb6bb229a9b0": true,
    "0x9e55f1678560fd2b345ac9a509df55bf732632f1": true,
    "0x2117b50bcbdf3f9e415e985d2755501618bceb19": true,
    "0x4a136ae1bc78a3b4e83303d4fad2c5978f08d6d2": true,
    "0x32d9bdffe9ca0487c1154cabf7c97c73b3313396": true,
    "0xa881159c68d84ecc459b09ac824fc42b6856f58d": true,
    "0x6872e67508570b68c5ef8ba332e677dd4480570e": true,
    "0x7e697b424b0cc808feaa6fd35c5300e83a5b44d3": true,
    "0x1c74e6e85bf53f1b6c56465e1a5f7bf56c3ebcb7": true,
    "0x0c55b13cec1df9a2acac90d16e80105fc3207344": true,
    "0x703101c9dceb93356c60e557e9da27b631d61ff9": true,
    "0xa5db44e5002d9558a04337f50f9212d5ce715a8a": true,
    "0xe290e867dd1a7373c9d0422277ca1747a656bfb2": true,
    "0x31ea2730a76c7d480bba0267eb91d02a3087ea88": true,
    "0x2723723fdd3db8ba2d6f0e1b333e90a7e60a0411": true,
    "0x7423979f27e378b7dbd51412a81a779eeab4863e": true,
    "0x7c9eb06dfbb320d9eb6cff26c83b0573c5e38c52": true,
    "0x537d6a90650164750492509eee0d646cbb7e99f4": true,
    "0xc480018ede061faabad3a05f43b6982132843ab4": true,
    "0x8b8a08a2af33306d8a897aad6269ea19e448a339": true,
    "0xaa0e2529f9c33e3ad86346fe26fefc4bc635fc67": true,
    "0xd4d00a14d2d3181dbebeaf062933d150e9bafb27": true,
    "0x33cf4977eedae8278e3c0344df3eb86b3c83480f": true,
    "0xd84e11bee5d555ccd905817cb8cbbd5b6e6c4f0d": true,
    "0xb71cd2a879c8d887ea8d75155ff51116178641c0": true,
    "0xc3465b3200ffe73e5ae9261cbb6455b842e5bf79": true,
    "0x1fd50f346d8c3f7c519f0e595d4c18a5ef38c17c": true,
    "0x559a41e9b0bf708d61ae720ad4907479fdbe8f37": true,
    "0xd5fa57fd1b51f2c190756d6ac75667dc1c0fa532": true,
    "0x537037c5ae805b9d4cecab5ee07f12a8e59a15b2": true,
    "0xd870e0af031778d00d53943bd55e00eed0d3013e": true,
    "0x753c46389ee4df0e56f72822b998d04c8fe19acb": true,
    "0x538c8ec378fa4a27331c281ed7803a46fd17f566": true,
    "0xb3aeaf62defe5811a1d733d59099051f406ad5e5": true,
    "0x51986fe0803cc9fa839129368301df041c7f0946": true,
    "0x362320f3a3eeeb4c4699b1b9062a84b2612bcdba": true,
    "0x9bbc502058450392fb6a40f6a82bcfe450a389cf": true,
    "0xc781b829aff316334fd732a8822ca27677872a31": true,
    "0xa0faa58e05f32d11637005f342b58f2f3e30ffb8": true,
    "0xd674d9dbea02b7457408ed2cd21051498ec8d13c": true,
    "0xce4f32750bcc4b3d07cf824467a66b5227c0a6db": true,
    "0x5c2f741f0ac4ee5fc470e51f8edf115fcd47aaaa": true,
    "0xf968a5de2019de1f0a8f53758dd137ae5c9efbc9": true,
    "0x2f59a307319b52c0928e679ac625cf7d3c883d36": true,
    "0x7e697b424b0cc808feaa6fd35c5300e83a5b44d3": true,
    "0x570866568da48898755268239c27e34afa575226": true,
    "0x07a84d342c14e85ed8e73c4bce3d9bfe50dc8918": true,
    "0xc7e961d9dc7e9d7fa2aebe932cef90dfceb78e83": true,
    "0xd3de1f8aa8e9cf7133bb65f4555f8f09cfcb7473": true,
    "0x003dfd836b5aecc95f0e42f1e1f21879c31e8f46": true,
    "0xdbf4198f3fbd1af5fd4adc67053dcf9111b8ca5c": true,
    "0x1337c0de7360c041fc72b08b97de0d88475a1c5b": true,
    "0xa1367d73af7f3a66938c3293f767d2377e882997": true,
    "0xad000b7d6344458e3c821a029bf6cb997835fa13": true,
    "0xd5e86ca8c79f17b0ca2c43c93504854473f7de14": true,
    "0x6BDD6Bb68Ec6927F56749b46746F0AFA7CdA9F3c": true,
    "0xc5cf11a157937d8ead1c0c3782b52f820f9bf880": true,
    "0xb9b8ef61b7851276b0239757a039d54a23804cbb": true,
    "0x4e880933aaa461a5fbd0d499f1e142d78f77c8ea": true,
    "0x6767a7296ea3bde8c01a1678e0ba3beb2917cc80": true,
    "0x02482542a0faac1ecda7edd32179057f48ef6d19": true,
    "0xae80ca1f042ee397c405d4b6c46761632669d4db": true,
    "0x75cace0baba984f721f40443ce4acb6bb229a9b0": true,
    "0xef628c724ad2843d12e060f0a5da00403e77ed6d": true,
    "0x26e2e8a24e867e5e96ea0c4913e659cdc8a97973": true,
    "0x2a6a8b9fa287bbfa38c0159cd09e485a9c6d2a98": true,
    "0xd53fccdb4370fb743f907a427cb610e34c3ebfa2": true,
    "0x2170a7405275f4bb7062acafa4606607185b04cc": true,
    "0x570a995e230e6c4a48e3f9793762800be10aefbe": true,
    "0x6bdd6bb68ec6927f56749b46746f0afa7cda9f3c": true,
    "0x0c04187bb588fe4a76c2060583575babd5d99b3b": true,
    "0x6127cb39ac8e6066c469ace0edcc3506feaabf94": true,
    "0x1079778b3f805b8030f5b9fedc52e92d65f70ce2": true,
    "0xed758cf2774da3f921c4cb673c75add922b41817": true,
    "0xd8fa4fc7e2f905d85bdb4d0a9a69156c2d58ed11": true,
    "0xaa74f9df7664e66783eca091f93dde27b233b58b": true,
    "0x58f3ba0f769070fc76353ba2cc4098cda1975653": true,
    "0xed95dbbc066fd0a28038145f58f2c5944a185a69": true,
    "0xf38b740359d0a7ee22580c91e10083bb1a4988c7": true,
    "0xf1df86e8b7c68835f35bf215eb2a464ce0397c2e": true,
    "0x75d5ced39b418d5e25f4a05db87fcc8bceed7e66": true,
    "0x439001e00378ee142489f56c04895fac01dc0bb5": true,
    "0x8a935de8b48dc2c0fe759add2ec7b4312f4bae71": true,
    "0x37900736d4baa4fc9930c1a89352391228628c64": true,
    "0x037206acaa8ee3da02e9abe429f51255476a64d6": true,
    "0xe9610e6d16d2611c50bd7355100fba9ee6dceb5c": true,
    "0x5dac9ccc215b9af65b486066786f79d9aa0043da": true,
    "0x753e0fb90ec97cf202044d4c3b1f759210f4d8d1": true,
    "0x21431f1065663ce883f5157eddb6f2fd9df66451": true,
    "0x5d55ee935d1aad8cace20528c63b26bc6417b6ce": true,
    "0xebe8416999e7095af04f6df883d52eccf915721a": true,
    "0x726cdc837384a7deb8bbea64beba2e7b4d7346c0": true,
    "0x1729f93e3c3c74b503b8130516984ced70bf47d9": true,
    "0xb4e597e34e3ec254e9e4795ecf1a31b9fa1e40f4": true,
    "0xc90f4fb05116ef4325e992c83e96266eb574edc2": true,
    "0xb605d920feef5325dd92d912edf19c906d37dd4c": true,
    "0x0542e8f95f765b81cd6a08db37d914f664db5d3e": true,
    "0xad12a8bab38347380f3d0542cced81105e95d6b4": true,
    "0xb39f8e0ba776d20f62d9e86f386af8eafc83942c": true,
    "0xd0b0fd6ea26b83864b244bc32c931407f7d89ccc": true,
    "0x69bde8ebdcc8da6fd11dd8bda67c27fbbc8a9cd5": true,
    "0xf6fc33d553cbfe396086606420d7fcd002065bd2": true,
    "0x6977e753e022f65ebeb170d8267b2ea54a431523": true,
    "0xd683b6dbe2d746e159d9eef5fcdab701402f8db9": true,
    "0xbc3734ffe344a70cf9c458293d6c285967dbe071": true,
    "0x8980b0f2434a4e4cfe5b8bf0e413bbced0f528ba": true,
    "0x0cf29c333a84064723b3c8d4630a5af539f18e3c": true,
    "0x4eac7644b1872c0d3bda1667c6657a06f5e46489": true,
    "0x43da9fd2ab075601518e8b77a5ed26f18df542cf": true,
    "0x8fc2c7c58144dc9b4fb06dbaf5eede111c26c748": true,
    "0xee54e79dbc3f449d13d32e0ad526d0a0435c386e": true,
    "0x87a84fa0a3f9be3feccbe4117ff980f3ac0f09c9": true,
    "0x3cb226ae639bf01052c1c8a0479c2021d1906d96": true,
    "0xaa470c4addd38c70595b50fd169a1c293cf56ab8": true,
    "0xd673f3c3df723dc0a05070ae8ceca51379673a85": true,
    "0x7be588d13553b6fb7be3c05e8df49cd392add6c6": true,
    "0xf1f12a06ca57bfb6f8d2b075577a6d138f1d70e8": true,
    "0x311491b49ef1de69d8e69fc5214237cc59e487fd": true,
    "0x0420a8c676248f53f0bdbe66c57bc5f88f2ff95f": true,
    "0x36e54b5cd1b7ee9eee83fac537ec389759dcb61a": true,
    "0x9c3b2cd8b84224b5bdd1477c53e9d4de1f19ad56": true,
    "0x1fe816ec5baa07ecfb0d318784a9c1acf1167fce": true,
    "0xbed17aa3e1c99ea86e19e7b38356c54007bb6cde": true,
    "0x6bdd6bb68ec6927f56749b46746f0afa7cda9f3c": true,
}