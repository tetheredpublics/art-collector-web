<script lang="ts">
    export let href: string = "https://forms.gle/kHuwRg63drVoTgCF9";
    export let compact: boolean = true;
    
    let label: string = "Join Android Waitlist";
    let labelCompact: string = "Join Waitlist";

</script>

<a href={href} target="_blank" class="border border-[#a6a6a6] inline-flex items-center h-[40px] justify-center px-2 bg-black text-white rounded-md font-medium text-sm ">
  <img src="/icons/android-logo.svg" alt="Android" class="w-[28px] h-[28px]" />
  <span class="px-2">{compact ? labelCompact : label}</span>
</a>