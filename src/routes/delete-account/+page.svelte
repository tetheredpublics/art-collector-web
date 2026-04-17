<script>
    import SEO from "../../components/SEO.svelte";
</script>

<SEO 
    title="Account & Data Deletion – Art Collector"
    description="Request deletion of your Art Collector account and associated data."
/>

<main class="pb-32 pt-16">
    <div class="p-4 max-w-2xl mx-auto">        
        <h1 class="text-3xl md:text-4xl font-black text-gray-800 mb-6">Account & Data Deletion</h1>
        
        <p class="text-base/loose font-bold text-gray-600 mb-10">
            You can request deletion of your Art Collector account and associated data at any time.
        </p>

        <div class="mb-10 pb-10 border-b border-gray-200">
            <h2 class="text-xl font-black text-gray-800 mb-4">Delete in the app</h2>
            <p class="text-base/loose font-bold text-gray-600 mb-4">
                For the fastest way to delete your account:
            </p>
            <ol class="list-decimal list-inside text-base/loose font-bold text-gray-600 space-y-2 ml-2">
                <li>Open the Art Collector app</li>
                <li>Go to Account Settings</li>
                <li>Tap Delete Account</li>
            </ol>
        </div>

        <div class="mb-10 pb-10 border-b border-gray-200">
            <h2 class="text-xl font-black text-gray-800 mb-4">Request deletion without the app</h2>
            <p class="text-base/loose font-bold text-gray-600 mb-4">
                If you cannot access the app, you can request deletion by completing this form:
            </p>
            <p class="mb-6">
                <a 
                    class="inline-block border-darkBlue hover:bg-darkBlue border-2 font-bold shadow-blue bg-primary text-sm rounded-md text-white py-2 px-4"
                    href="https://forms.gle/mGsxEJwEqMpuiwW58" 
                    target="_blank"
                >
                    Open Deletion Request Form
                </a>
            </p>
            <p class="text-base/loose font-bold text-gray-600 mb-4">
                Or email: <a class="text-link underline" href="mailto:creators@artcollectorapp.net">creators@artcollectorapp.net</a>
            </p>
            <p class="text-base/loose font-bold text-gray-600">
                Include the email address associated with your account. Manual requests may take a few days, and we may need to verify your identity.
            </p>
        </div>

        <div class="mb-10 pb-10 border-b border-gray-200">
            <h2 class="text-xl font-black text-gray-800 mb-4">After a deletion request</h2>
            <ul class="list-disc list-inside text-base/loose font-bold text-gray-600 space-y-3 ml-2">
                <li>Your account will be deactivated</li>
                <li>There is a 7-day grace period for recovery</li>
                <li>After 7 days, your account and associated personal data will be permanently deleted</li>
                <li>Artworks associated with your account will be released and made available to other users</li>
            </ul>
        </div>

        <div>
            <h2 class="text-xl font-black text-gray-800 mb-4">Privacy Policy</h2>
            <p class="text-base/loose font-bold text-gray-600">
                For more information about how we handle your data, please read our 
                <a class="text-link underline" href="/privacy.html" target="_blank">Privacy Policy</a>.
            </p>
        </div>
    </div>
</main>
