<template>
  <div class="lg:container m-auto">
    <footer
      class="mt-5 shadow bg-blue-500 p-4 grid grid-cols-1 md:grid-cols-2 gap-5 lg:grid-cols-3 lg:place-items-center lg:rounded-t-xl lg:pr-5"
    >
      <div>
        <h3 class="text-2xl font-semibold">چرا دیجی جادو؟</h3>
        <p class="mt-2 text-gray-100 text-justify">
          دیجی جادو، جایی که جادوی خرید آنلاین اتفاق می‌افته! ما در دیجی جادو با
          شعار "خریدی جادویی، تجربه‌ای به یاد ماندنی" تلاش می‌کنیم بهترین
          محصولات رو با بالاترین کیفیت و مناسب‌ترین قیمت به شما ارائه بدیم. تیم
          ما متشکله از افراد متخصص و پرانرژی‌ست که همیشه آماده‌اند تا بهترین
          تجربه خرید رو براتون رقم بزنن. به دنیای جادویی دیجی جادو خوش اومدین!
        </p>
      </div>
      <div>
        <h3 class="font-semibold text-2xl my-2">لینک های مفید</h3>
        <ul class="text-gray-700">
          <li class="mb-1">
            <NuxtLink to="/products" class="hover:text-blue-700"
              >فروشگاه</NuxtLink
            >
          </li>
          <li class="mb-1">
            <NuxtLink to="/blogs" class="hover:text-blue-700">بلاگ</NuxtLink>
          </li>
          <li class="mb-1">
            <NuxtLink to="/contact-me" class="hover:text-blue-700"
              >ارتباط با ما</NuxtLink
            >
          </li>
          <li>
            <NuxtLink to="/about-me" class="hover:text-blue-700"
              >درباره ما</NuxtLink
            >
          </li>
        </ul>
      </div>
      <div>
        <h3 class="font-semibold text-2xl my-2">ارتباط با دیجی جادو</h3>
        <ul class="text-blue-700">
          <li class="font-medium mb-1">09037407529</li>
          <li class="font-medium">09303315834</li>
        </ul>
        <p class="mt-2">ساعت کاری : 24 ساعت 7 روز هفته</p>
      </div>
    </footer>
  </div>
</template>
