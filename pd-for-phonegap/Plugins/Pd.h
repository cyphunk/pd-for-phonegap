#import <Cordova/CDVPlugin.h>
#import "PdAudioController.h"
#import "PdBase.h"

@class PdAudioController;

@interface Pd : CDVPlugin {
	PdAudioController *audioController;
}

- (void) setup:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;

- (void) send:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;

- (void) setAudioActive:(BOOL)active;

@end
