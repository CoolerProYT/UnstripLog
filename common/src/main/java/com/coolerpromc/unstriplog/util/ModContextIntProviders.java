package com.coolerpromc.unstriplog.util;

import com.coolerpromc.unstriplog.Constants;
import net.minecraft.core.registries.Registries;
import net.minecraft.data.worldgen.BootstrapContext;
import net.minecraft.resources.ResourceKey;
import net.minecraft.world.level.storage.loot.providers.number.ints.ConstantValue;
import net.minecraft.world.level.storage.loot.providers.number.ints.ContextIntProvider;

public class ModContextIntProviders {
    public static final ResourceKey<ContextIntProvider> COOKING_TIME_BARK = key("cooking/bark");

    public static void bootstrap(BootstrapContext<ContextIntProvider> context) {
        context.register(COOKING_TIME_BARK, new ConstantValue(150));
    }

    private static ResourceKey<ContextIntProvider> key(String location) {
        return ResourceKey.create(Registries.CONTEXT_INT_PROVIDER, Constants.id(location));
    }
}
