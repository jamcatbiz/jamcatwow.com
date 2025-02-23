<svelte:head>
  <title>Current Password Incorrect</title>
</svelte:head>

<h1 class="text-2xl font-semibold font-serif my-6">
  Current Password Incorrect
</h1>

<p class="card card-bordered border-error p-5">
  You attempted to edit your account but got the current password wrong. We've
  logged you out as a precaution.
</p>
<p class="mt-6 opacity-70">
  Remember your password? <a href="/login/sign_in" class="link">Sign in</a>.
</p>
<p class="mt-6 opacity-70">
  Forgot your password? <a href="/login/forgot_password" class="link"
    >Reset it</a
  >.
</p>
