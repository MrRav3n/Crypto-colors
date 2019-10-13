const CryptoColors = artifacts.require("CryptoColors")

require('chai')
.use(require('chai-as-promised'))
.should()

contract('CryptoColors', ([deployer, account1, account2]) => {
    let token;
    before(async() => {
        token = await CryptoColors.deployed();
    })
    describe('should be initialized', async() => {
        it('has basic data', async() => {
            assert.notEqual(token.address, 0x0);
            assert.notEqual(await token.name(), '');
            assert.notEqual(await token.symbol(), '');
            assert.notEqual(await token.decimals(), '');
            assert.notEqual(await token._totalSupply(), '')
        })
    })
    describe('tokens paramets tests', async() => {
        it('total supply', async() => {
            assert.equal(await token._totalSupply(), 10000000000000000000)
        })
        it('approve', async() => {
            const approve = await token.approve(account2, 100, {from: deployer})
            const result = approve.logs[0].args
            assert.equal(result[0], deployer)
            assert.equal(result[1], account2)
            assert.equal(result[2], 100)
        })
        it('balanceOf', async() => {
            assert.equal(await token.balanceOf(deployer), 1000000000000000000)
        })
        it('allowance', async() => {
            assert.equal(await token.allowance(deployer, account2), 100)
        })
        it('transfer', async() => {
            const transfer = await token.transfer(account1, 100, {from: deployer})
            const result = transfer.logs[0].args
            assert.equal(result[0], deployer)
            assert.equal(result[1], account1)
            assert.equal(result[2], 100)
            assert.equal(await token.balanceOf(account1), 100)
            assert.equal(await token.balanceOf(deployer), 1000000000000000000-100)
            await token.transfer(account1, 100, {from: account2}).should.be.rejected
            await token.transfer(account1, 1000000000000000000, {from: deployer}).should.be.rejected
        })
        it('transferFrom', async() => {
            await token.transferFrom(deployer, account1, 101, {from: account2}).should.be.rejected
            const transferFrom = await token.transferFrom(deployer, account1, 100, {from: account2})
            const result = transferFrom.logs[0].args;
            assert.equal(result[0], deployer)
            assert.equal(result[1], account1)
            assert.equal(result[2], 100)
            assert.equal(await token.balanceOf(account1), 200)
            assert.equal(await token.balanceOf(deployer), 1000000000000000000-200)
            await token.transferFrom(deployer, account1, 1, {from: account2}).should.be.rejected
            await token.transferFrom(deployer, account1, 100, {from: account1}).should.be.rejected
            await token.transferFrom(account1, account1, 100, {from: account2}).should.be.rejected
            await token.transferFrom(account2, account1, 100, {from: account2}).should.be.rejected
        })
    })
    describe('CryptoColors tests', async () => {

        it('should add colors', async() => {
            let balanceAccount1 = await token.balanceOf(account1) //200
            let balanceAccount2 = await token.balanceOf(account2) //0
            await token.addColor("", 200, {from: deployer}).should.be.rejected
            await token.addColor("Brown", 0, {from: deployer}).should.be.rejected
            await token.addColor("Brown", 200, {from: account1}).should.be.rejected
            await token.addColor("Red", 200, {from: deployer})
            await token.addColor("Brown", 200, {from: deployer}).should.be.rejected
            assert.equal(await token.colorsCount(), 1);
            const result1=await token.colors.call(0)
            assert.equal(result1[0], deployer)
            assert.equal(result1[1], 200)
            assert.equal(result1[2], "Red")
            assert.equal(result1[3], false)
        })
        it('should buy colors', async () => {
            await token.buyColor(0, {from: account2}).should.be.rejected
            await token.buyColor(1, {from: account1}).should.be.rejected
            await token.buyColor(0, {from: account1})
            const result1=await token.colors.call(0)
            assert.equal(result1[0], account1)
            assert.equal(result1[1], 200)
            assert.equal(result1[2], "Red")
            assert.equal(result1[3], true)
            let balanceAccount1 = await token.balanceOf(account1)
            let balanceDeployer = await token.balanceOf(deployer)
            assert.equal(balanceDeployer, 1000000000000000000);
            assert.equal(balanceAccount1.toString(), "0");
            const result2=await token.people.call(account1)
            assert.equal(result2, 1)
        })
        it('should sell products', async() => {
            await token.sellColor(1, 150, {from: account1})
            const result1=await token.colors.call(1)
            assert.equal(result1[0], account1)
            assert.equal(result1[1], 150)
            assert.equal(result1[2], "Red")
            assert.equal(result1[3], false)
            await token.buyColor(1, {from: deployer})
            const result2=await token.colors.call(1)
            assert.equal(result2[0], deployer)
            assert.equal(result2[1], 150)
            assert.equal(result2[2], "Red")
            assert.equal(result2[3], true)
            let balanceAccount1 = await token.balanceOf(account1)
            let balanceDeployer = await token.balanceOf(deployer)
            assert.equal(balanceDeployer, 1000000000000000000-150);
            assert.equal(balanceAccount1.toString(), "150");
        })
    })
})
