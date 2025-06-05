<template>
	<b-container>
		<b-row>
			<b-col>
				<client-only>

					<div class="mailchimp">
						<!-- Begin MailChimp Signup Form -->
						<div id="mc_embed_signup">
							<form
								action="https://manage.kmail-lists.com/subscriptions/subscribe"
								method="POST"
								target="_blank"
								novalidate
							>
								<input type="hidden" name="g" value="VbUD5y">
								<input type="hidden" name="a" value="VnVavY">
								<div id="mc_embed_signup_scroll" class="clear mailchimp__form-container">
									<label for="k_email" class="mailchimp__label pb-5">Be in the know</label>
									<input
										type="email"
										name="email"
										id="k_email"
										class="email mailchimp__input"
										placeholder="Join Our Newsletter"
										required
									>
									<div class="submit-arrow mailchimp__submit">
										<input type="submit" value="→" class="button">
									</div>
									<div class="clear"></div>
								</div>
							</form>
						</div>
					</div>
				</client-only>
			</b-col>
		</b-row>
	</b-container>
</template>
