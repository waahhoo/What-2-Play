<script>
	import { cn } from "$lib/utils.js";
	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	} = $props();
</script>

<span
	bind:this={ref}
	data-slot="marker-icon"
	aria-hidden="true"
	class={cn("size-4 [&_svg:not([class*='size-'])]:size-4 shrink-0", className)}
	{...restProps}
>
	{@render children?.()}
</span>