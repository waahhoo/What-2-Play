<script>
	import { cn } from "$lib/utils.js";
	let {
		ref = $bindable(null),
		class: className,
		align = "start",
		children,
		...restProps
	} = $props();
</script>

<div
	bind:this={ref}
	data-slot="message"
	data-align={align}
	class={cn(
		"text-sm gap-2 group/message relative flex w-full min-w-0 data-[align=end]:flex-row-reverse",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>