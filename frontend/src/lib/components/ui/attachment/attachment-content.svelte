<script>
	import { cn } from "$lib/utils.js";
	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	} = $props();
</script>

<div
	bind:this={ref}
	data-slot="attachment-content"
	class={cn("leading-tight group-data-[orientation=vertical]/attachment:px-1 max-w-full min-w-0 flex-1", className)}
	{...restProps}
>
	{@render children?.()}
</div>