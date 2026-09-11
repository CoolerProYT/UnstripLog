package com.coolerpromc.unstriplog.handler;

import com.coolerpromc.unstriplog.platform.FabricPlatformHelper;
import net.fabricmc.fabric.api.event.lifecycle.v1.CommonLifecycleEvents;
import net.fabricmc.fabric.api.event.lifecycle.v1.ServerLifecycleEvents;
import net.fabricmc.fabric.api.event.player.UseBlockCallback;

public class FabricLogHandler {
    public static void init() {
        ServerLifecycleEvents.SERVER_STARTING.register(server -> LogHandler.loadStrippables(server.registryAccess()));
        CommonLifecycleEvents.TAGS_LOADED.register((registries, client) -> {
            if (client && FabricPlatformHelper.SERVER == null) {
                LogHandler.loadStrippables(registries);
            }
        });

        UseBlockCallback.EVENT.register(LogHandler::onStrip);
        UseBlockCallback.EVENT.register(LogHandler::onUnstrip);
    }
}
