'use strict';

const BaseManager = require('./base.manager');
const ValidationError = require('../exception/validation.error');
const RenewalValtRepository = require('../repository/renewal-vault.repository');
const NotFound = require('../exception/not-found.error');


const SCHEMA = require('../constant/schema');
const MSG = require('../constant/msg')

class ClaimManager extends BaseManager {

    constructor(async_param) {
        super(async_param);
        this.renewalRepository = new RenewalValtRepository();
    }

    async onClaim(bodyParams) {
        try {
            const validationResult = this.validate(SCHEMA.ON_PAYMENT_RECEIVED, bodyParams);

            if (validationResult.valid) {
                const { TXT_POLICY_NO } = bodyParams;
                const policy = await this.renewalRepository.findOne(TXT_POLICY_NO);
                if (!policy) {
                    throw new NotFound(MSG.POLICY_NOT_FOUND);
                }
                policy.TXT_RECALC_FLAG = "Y";
                await this.renewalRepository.saveOrUpdate(policy, false);
                return {
                    ok: true,
                    message: MSG.CLAIM_STATUS_UPDATED
                };
            }
            throw new ValidationError(MSG.VALIDATION_ERROR, validationResult.errors);
        } catch (err) {
            throw err;
        }
    }

}

module.exports = ClaimManager;