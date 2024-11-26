import {beforeEach, describe, expect, it} from "vitest"
import {mockDeep} from 'vitest-mock-extended';
import {ForgotPassword} from "@/core/user/forgot-password/use-case/forgot-password";
import {ForgotPasswordController} from "@/core/user/forgot-password/controller/forgot-password-controller";

describe('ForgotPasswordController', () => {
    let controller: ForgotPasswordController;
    let service: ForgotPassword;

    beforeEach(() => {
        service = mockDeep<ForgotPassword>({
            resetPassword: async () => {
            }
        });
        controller = new ForgotPasswordController(service);
    });

    describe('post should', () => {
        it('handle 200', async () => {
            const givenEmail = 'myemail@email.com'
            const request = new Request('http://localhost:8080/user/forgot-password', {
                method: 'POST',
                body: JSON.stringify({email: givenEmail})
            });
            const response = await controller.post(request);
            expect(response.status).toBe(200);
            expect(await response.json()).toEqual({message: `Email sent to ${givenEmail}`});
        });

        it('handle 400', async () => {
            const request = new Request('http://localhost:8080/user/forgot-password', {
                method: 'POST',
                body: JSON.stringify({email: 'invalid-email'})
            });
            const response = await controller.post(request);
            expect(response.status).toBe(400);
            expect(await response.json()).toEqual({error: 'Invalid email'});
        });

        it('handle 500', async () => {
            service.resetPassword = async () => {
                throw new Error('Unknown error');
            };
            const request = new Request('http://localhost:8080/user/forgot-password', {
                method: 'POST',
                body: JSON.stringify({email: 'myemail@email.com'})
            });
            const response = await controller.post(request);
            expect(response.status).toBe(500);
            expect(await response.json()).toEqual({error: 'Unknown error while reset password'});
        });
    });
});