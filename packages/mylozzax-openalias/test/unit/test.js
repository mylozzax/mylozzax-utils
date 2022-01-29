'use strict'

const axios = require('axios')
const MockAdapter = require('axios-mock-adapter')
const assert = require('assert')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.should()
chai.use(chaiAsPromised)
const expect = chai.expect

const OpenAlias = require('../../index')

describe('Open alias tests', function () {
  it('lookup throws error on invalid server address', async function () {
    const mock = new MockAdapter(axios)

    mock.onGet('/dns-query').networkError()

    const oa = new OpenAlias({ httpClient: axios, url: 'example.com' })

    await expect(oa.lookup('none.lozzax.xyz')).to.be.rejectedWith(Error, 'no response')
  })

  it('lookup returns no answer response', async function () {
    const mock = new MockAdapter(axios)

    mock.onGet('/dns-query').reply(200, {
      Status: 0,
      TC: false,
      RD: true,
      RA: true,
      AD: false,
      CD: false,
      Question: [ { name: '', type: 16 } ],
      Authority: [
        {
          name: '',
          type: 6,
          TTL: 86400,
          data: 'a.root-servers.net. nstld.verisign-grs.com. 2021110300 1800 900 604800 86400'
        }
      ]
    })

    const oa = new OpenAlias({ httpClient: axios, url: 'example.com' })

    await expect(oa.lookup('')).to.be.rejectedWith(Error, 'no records found')
  })

  it('lookup returns multiple results', async function () {
    const mock = new MockAdapter(axios)

    mock.onGet('/dns-query').reply(200, {
      Status: 0,
      TC: false,
      RD: true,
      RA: true,
      AD: true,
      CD: false,
      Question: [ { name: 'donate.getlozzax.org', type: 16 } ],
      Answer: [
        {
          name: 'donate.getlozzax.org',
          type: 16,
          TTL: 271,
          data: '"oa1:btc recipient_address=1KTexdemPdxSBcG55heUuTjDRYqbC5ZL8H; recipient_name=Lozzax Development; tx_description=Donation to Lozzax Core Team;"'
        },
        {
          name: 'donate.getlozzax.org',
          type: 16,
          TTL: 271,
          data: '"oa1:lozz recipient_address=888tNkZrPN6JsEgekjMnABU4TBzc2Dt29EPAvkRxbANsAnjyPbb3iQ1YBRk1UXcdRsiKc9dhwMVgN5S9cQUiyoogDavup3H; recipient_name=Lozzax Development; tx_description=Donation to Lozzax Core Team;"'
        }
      ]
    })

    const oa = new OpenAlias({ httpClient: axios, url: '' })

    const result = await oa.lookup('donate.getlozzax.org')

    const expected = [
      {
        currency: 'btc',
        address: '1KTexdemPdxSBcG55heUuTjDRYqbC5ZL8H',
        name: 'Lozzax Development',
        description: 'Donation to Lozzax Core Team'
      },
      {
        currency: 'lozz',
        address: '888tNkZrPN6JsEgekjMnABU4TBzc2Dt29EPAvkRxbANsAnjyPbb3iQ1YBRk1UXcdRsiKc9dhwMVgN5S9cQUiyoogDavup3H',
        name: 'Lozzax Development',
        description: 'Donation to Lozzax Core Team'
      }
    ]

    assert.deepStrictEqual(
      result,
      expected
    )
  })

  it('lookup returns multiple non open alias results', async function () {
    const mock = new MockAdapter(axios)

    mock.onGet('/dns-query').reply(200, {
      Status: 0,
      TC: false,
      RD: true,
      RA: true,
      AD: true,
      CD: false,
      Question: [ { name: 'lozzax.xyz', type: 16 } ],
      Answer: [
        {
          name: 'lozzax.xyz',
          type: 16,
          TTL: 10647,
          data: '"SECUREBROWSE 1.0"'
        },
        {
          name: 'lozzax.xyz',
          type: 16,
          TTL: 10647,
          data: '"libera-verify-TODxU57t5l"'
        },
        {
          name: 'lozzax.xyz',
          type: 16,
          TTL: 10647,
          data: '"SECUREBROWSE-WHITELIST google-analytics.com/analytics.js widget.intercom.io/widget/hi3rzlw0 js.intercomcdn.com/*"'
        }
      ]
    })

    const oa = new OpenAlias({ httpClient: axios, url: '' })

    const result = await oa.lookup('lozzax.xyz')

    const expected = []

    assert.deepStrictEqual(
      result,
      expected
    )
  })

  it('lookup returns multiple single open alias result', async function () {
    const mock = new MockAdapter(axios)

    mock.onGet('/dns-query').reply(200, {
      Status: 0,
      TC: false,
      RD: true,
      RA: true,
      AD: true,
      CD: false,
      Question: [ { name: 'lozzax.xyz', type: 16 } ],
      Answer: [
        {
          name: 'lozzax.xyz',
          type: 16,
          TTL: 10647,
          data: '"SECUREBROWSE 1.0"'
        },
        {
          name: 'lozzax.xyz',
          type: 16,
          TTL: 10647,
          data: '"libera-verify-TODxU57t5l"'
        },
        {
          name: 'donate.getlozzax.org',
          type: 16,
          TTL: 271,
          data: '"oa1:lozz recipient_address=888tNkZrPN6JsEgekjMnABU4TBzc2Dt29EPAvkRxbANsAnjyPbb3iQ1YBRk1UXcdRsiKc9dhwMVgN5S9cQUiyoogDavup3H; recipient_name=Lozzax Development; tx_description=Donation to Lozzax Core Team;"'
        },
        {
          name: 'lozzax.xyz',
          type: 16,
          TTL: 10647,
          data: '"SECUREBROWSE-WHITELIST google-analytics.com/analytics.js widget.intercom.io/widget/hi3rzlw0 js.intercomcdn.com/*"'
        }
      ]
    })

    const oa = new OpenAlias({ httpClient: axios, url: '' })

    const result = await oa.lookup('lozzax.xyz')

    const expected = [
      {
        currency: 'lozz',
        address: '888tNkZrPN6JsEgekjMnABU4TBzc2Dt29EPAvkRxbANsAnjyPbb3iQ1YBRk1UXcdRsiKc9dhwMVgN5S9cQUiyoogDavup3H',
        name: 'Lozzax Development',
        description: 'Donation to Lozzax Core Team'
      }
    ]

    assert.deepStrictEqual(
      result,
      expected
    )
  })
})
